# 06 · Reverse Engineering

[Home](../../README.md) › [Categories](../CATEGORIES_OVERVIEW.md) › **Reverse engineering**
&nbsp;·&nbsp; Presentation: slides 21–22 &nbsp;·&nbsp; [← 05 · Web exploitation](05-WEB-EXPLOITATION.md) · [07 · Binary exploitation →](07-BINARY-EXPLOITATION.md)

> [!NOTE]
> Reverse engineering software you don't own can breach licence agreements or laws (e.g. anti-circumvention rules). Practise on CTF binaries, crackmes made for the purpose, and programs **you wrote yourself**.

---

## Contents

- [A. Introduction](#a-introduction)
- [B. Prerequisites](#b-prerequisites)
- [C. Understanding the challenges](#c-understanding-the-challenges)
- [D. Step-by-step methodology](#d-step-by-step-methodology)
- [E. Tools and their usage](#e-tools-and-their-usage)
- [F. Recommended learning resources](#f-recommended-learning-resources)
- [G. Mini practice exercises](#g-mini-practice-exercises)
- [H. What to learn next](#h-what-to-learn-next)

---

## A. Introduction

### A scenario

You download a small game for your coursework group. It asks for a "licence key". Out of curiosity you open the program file in a text viewer: amid the gibberish, there's a readable line, `KEY-2026-STUDENT`. You've just reverse engineered a program without its source code. (Then, of course, you delete it, because that game wasn't yours to crack. In CTFs, it is.)

### What it is

**Reverse engineering (RE)** is figuring out how something works by analysing the finished product. In CTFs, you get a **compiled program** (no source code) that checks a password or hides a flag, and you must understand its logic well enough to recover the secret.

### Source code vs executable

```
 source code (human-readable)  ──compiler──►  executable (machine code)
 if (strcmp(input, "s3cret")…)                 48 8d 3d 1a 0e 00 00 e8 …
```

- **Source code** is what programmers write (C, Java, Python…).
- A **compiler** translates it into **machine code**: instructions the CPU executes directly. Names, comments and structure are mostly lost.
- An **executable** wraps that machine code in a format the operating system understands: **ELF** on Linux, **PE** (`.exe`, `.dll`) on Windows, **Mach-O** on macOS. Android apps (`.apk`) contain **Dalvik bytecode**, which is much easier to turn back into Java.
- **Decompilers** try to turn machine code back into readable C-like code. It won't be the original, but it's often close enough.

### Where you meet it in real life

| Field | Example |
|---|---|
| Malware analysis | Understanding what a new virus does and how to detect it |
| Vulnerability research | Finding bugs in closed-source software (to report and fix them) |
| Interoperability | Making software work with an undocumented file format or device |
| Legacy systems | Maintaining software whose source code was lost |
| Software protection | Testing whether your own anti-tampering works |

### Why it's interesting

It's solving a puzzle that someone else built, one instruction at a time. You'll understand computers at the deepest level: how `if` statements, loops and functions actually look to the CPU.

### How it relates to cybersecurity

Malware analysts and vulnerability researchers reverse engineer every day. RE is also the foundation for [binary exploitation](07-BINARY-EXPLOITATION.md): you can't exploit a program you don't understand.

---

## B. Prerequisites

| Level | What | Why |
|---|---|---|
| **Essential** | Basic programming in any language (variables, `if`, loops, functions) | You're reading programs; you need to recognise program logic. |
| **Essential** | Patience | RE is slow at first and gets faster with practice. |
| **Helpful** | C | Decompilers output C-like code. [CS50x](https://cs50.harvard.edu/x/) teaches C free. |
| **Helpful** | Hexadecimal, ASCII | Values in binaries are shown in hex. |
| **Helpful** | Command line on Linux | `file`, `strings`, `objdump`, `gdb` live there (WSL works on Windows). |
| **Advanced** | x86-64 assembly | For when the decompiler isn't enough. Learn it gradually as you read code. |
| **Advanced** | Debuggers (GDB, x64dbg) | Dynamic analysis. |

- **Programming:** yes, at least basic. C helps most; Python for writing solver scripts.
- **Linux:** helpful; most CTF binaries are Linux ELF files.
- **Networking:** not required.
- **Learned while solving:** assembly, executable formats, debugging.

---

## C. Understanding the challenges

### What a typical challenge looks like

> *(Fictional example written for this guide.)*
> **"Gatekeeper" · 150 points**
> This program only lets in people who know the password. Do you?
> 📎 `gatekeeper` (Linux x86-64 ELF)

```console
$ ./gatekeeper
Password: hello
Access denied.
```

### What you're usually given

- A Linux **ELF** binary (most common), sometimes a Windows `.exe`, an Android `.apk`, a Java `.jar`, a .NET assembly or a Python `.pyc`.
- Occasionally an obfuscated script (JavaScript, PowerShell).

### Clues to look for

| Clue | Meaning |
|---|---|
| Strings like `Correct!`, `Access denied`, `Enter key:` | Find where they're used: that's the check |
| Calls to `strcmp`, `memcmp`, `strncmp` | Compares input to something: maybe the password directly |
| Loops with XOR, add or subtract on each character | The password is transformed; reverse the transformation |
| `.apk` / `.jar` | Use JADX; you'll get near-original Java |
| `.pyc` | Python bytecode: decompilable |
| "UPX" in `strings` output | The binary is packed: unpack it first (`upx -d`) |

### Common challenge patterns

1. **Hard-coded password:** visible with `strings`.
2. **Character-by-character check:** each input character is transformed and compared to a stored array.
3. **Math constraints:** the input must satisfy equations (solve by hand or with a solver like Z3).
4. **Packed or obfuscated binary:** unpack first, then analyse.
5. **Anti-debugging:** the program behaves differently when debugged.
6. **Non-native code:** Java, .NET, Python, Android: easier to decompile.

### Common beginner mistakes

| Mistake | Better habit |
|---|---|
| Opening Ghidra before trying `strings` | Cheap checks first. |
| Reading every function | Start from `main` or from the "Correct!" string and work backwards. |
| Running unknown binaries on your main machine | CTF binaries are usually safe, but use a VM for anything untrusted. |
| Trying to understand every assembly instruction | Focus on the **data flow** to the comparison. Rename variables as you understand them. |
| Brute-forcing what can be reversed | If you can see the transformation, invert it. |

---

## D. Step-by-step methodology

### 1. Identify the file

**Why:** the format decides the tools (ELF → Ghidra/GDB, APK → JADX, `.pyc` → Python decompiler).

```bash
file gatekeeper
```

Typical output: `ELF 64-bit LSB pie executable, x86-64, dynamically linked, … not stripped`. "Not stripped" means function names are still present, which helps a lot.

### 2. Look for readable strings

**Why:** easy flags and passwords show up here, and messages point you to the important code.

```bash
strings gatekeeper | less
strings gatekeeper | grep -i -E "flag|pass|correct|wrong"
```

### 3. Run it (safely) and observe

**Why:** this is **dynamic analysis**: watching behaviour. What input does it expect? What does it print?

### 4. Static analysis: decompile

**Why:** this is **static analysis**: reading the code without running it. A decompiler shows you the logic.

- Open in **Ghidra** → find `main` → read the decompiled C.
- Follow the input: where is it read (`fgets`, `scanf`)? What happens to it? What is it compared with?
- Rename variables (`L` in Ghidra) as you understand them: `local_28` → `user_input`.

### 5. Understand the check, then invert it

**Why:** the goal isn't to make the program say "Correct" but to know *what input* it wants.

If the program does `input[i] ^ 0x20 == key[i]`, then `input[i] = key[i] ^ 0x20`. Write that in Python.

### 6. Dynamic analysis: debug when stuck

**Why:** a debugger lets you pause the program and see actual values, which is useful when the logic is complex but the comparison is simple.

```bash
gdb ./gatekeeper
(gdb) break strcmp
(gdb) run
(gdb) x/s $rsi        # on x86-64 Linux, the 2nd argument: often the expected password
```

### 7. Verify

Run the program with your answer. If it says "Correct", submit.

### Assembly in five minutes

You'll meet these x86-64 instructions constantly:

| Instruction | Meaning | C equivalent |
|---|---|---|
| `mov rax, rbx` | Copy a value | `a = b` |
| `add` / `sub` | Arithmetic | `a += b` |
| `xor eax, eax` | XOR (with itself = set to 0) | `a ^= b` / `a = 0` |
| `cmp a, b` | Compare (sets flags) | part of `if (a == b)` |
| `je` / `jne` / `jg` / `jl` | Jump if equal / not equal / greater / less | the `if` branch |
| `jmp` | Always jump | `goto`, loops |
| `call func` / `ret` | Call a function / return | `func()` / `return` |
| `push` / `pop` | Put on / take off the stack | (function setup) |

**Registers** are tiny storage slots inside the CPU (`rax`, `rbx`, `rdi`, `rsi`, `rsp`…). On Linux x86-64, function arguments go in `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`, and the return value comes back in `rax`.

### Control flow

An `if` in C becomes a `cmp` followed by a conditional jump; a loop becomes a jump backwards. Ghidra's **Function Graph** view shows these as boxes and arrows, which makes the program's structure visible at a glance.

---

## E. Tools and their usage

### Which tools for which level?

| Level | Tools |
|---|---|
| **Beginner** | `file`, `strings`, JADX (for Android/Java), [Dogbolt](https://dogbolt.org/) (browser decompiler comparison) |
| **Beginner → intermediate** | Ghidra, Detect It Easy, `objdump` |
| **Intermediate** | GDB (+ pwndbg), x64dbg (Windows) |
| **Advanced** | IDA Pro / Binary Ninja (commercial), scripting Ghidra, symbolic execution (angr), Z3 |

### Ghidra

| | |
|---|---|
| **Website** | <https://github.com/NationalSecurityAgency/ghidra> (ghidra-sre.org redirects here) |
| **Documentation** | [Getting Started guide](https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md); built-in help (`F1`) |
| **Purpose** | Full reverse-engineering suite with a disassembler and decompiler, developed by the US NSA |
| **Problem it solves** | Turning machine code into readable C-like code and letting you annotate it |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Beginner to start, advanced to master |
| **When to use** | Any native binary (ELF, PE, Mach-O) beyond what `strings` shows |
| **Installation** | Install a 64-bit JDK first. Ghidra 12.2 requires **JDK 25**; check the Getting Started guide for the release you download. Free JDKs: [Adoptium](https://adoptium.net/). Then download a release from [GitHub Releases](https://github.com/NationalSecurityAgency/ghidra/releases), unzip and run `ghidraRun` (`ghidraRun.bat` on Windows). |
| **Alternative** | IDA Free (<https://hex-rays.com/ida-free>, free for non-commercial use, cloud decompiler), Binary Ninja (paid), Cutter/radare2 (free) |

**Try it:** *File → New Project* → *Import File* → double-click the binary → *Analyze: Yes*. In the *Symbol Tree*, open *Functions → main*. The decompiled code appears on the right. Press `L` on a variable to rename it.

### JADX

| | |
|---|---|
| **Website / Docs** | <https://github.com/skylot/jadx> (README is the documentation) · [Releases](https://github.com/skylot/jadx/releases) |
| **Purpose** | Decompiles Android apps (`.apk`, `.dex`, `.aab`) and Java bytecode to readable Java |
| **Problem it solves** | Reading an Android app's logic without its source |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Beginner |
| **When to use** | `.apk` or `.jar` challenges |
| **Installation** | Download a release. It needs 64-bit Java 11+, or use the `with-jre` bundle, which includes Java. Run `jadx-gui`. |
| **Alternative** | apktool (resources and smali), [Dogbolt](https://dogbolt.org/) for small files |

**Try it:** open an APK in `jadx-gui`, search (`Ctrl+Shift+F`) for "flag" or "password", and read `MainActivity`.

### Detect It Easy (DIE)

| | |
|---|---|
| **Website / Docs** | <https://github.com/horsicq/Detect-It-Easy> |
| **Purpose** | Identifies file type, compiler, packer and protector |
| **Problem it solves** | "What made this binary, and is it packed?" before you waste time on obfuscated code |
| **Platform** | Windows, Linux, macOS |
| **Type · Cost** | Installed (GUI and `diec` command line) · Free, open source |
| **Level** | Beginner |
| **When to use** | First look at any unknown executable, especially Windows PE files |
| **Installation** | Download from the GitHub releases page |
| **Alternative** | `file`; `strings` (look for "UPX") |

### GDB (GNU Debugger)

| | |
|---|---|
| **Website** | <https://www.sourceware.org/gdb/> |
| **Documentation** | [GDB documentation](https://sourceware.org/gdb/documentation/) · [Online manual](https://sourceware.org/gdb/current/onlinedocs/gdb.html/) |
| **Purpose** | Run a program step by step, pause it, inspect memory and registers |
| **Problem it solves** | Seeing real values at runtime (dynamic analysis) |
| **Platform** | Linux (primary); macOS and Windows (via WSL or MinGW) with limitations |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Intermediate |
| **When to use** | Static analysis is unclear, or you want to see what a comparison receives |
| **Installation** | `sudo apt install gdb`. Make it friendlier with [pwndbg](07-BINARY-EXPLOITATION.md#pwndbg). |
| **Alternative** | x64dbg (Windows, <https://x64dbg.com/>) |

Essential commands: `break main` · `run` · `next` / `step` · `continue` · `info registers` · `x/s <addr>` (show string) · `disassemble` · `quit`. More in the [GDB cheat sheet](../resources/CHEAT-SHEETS.md#gdb).

### strings

| | |
|---|---|
| **Docs** | [man page](https://man7.org/linux/man-pages/man1/strings.1.html) · [GNU binutils manual](https://sourceware.org/binutils/docs/binutils/strings.html) |
| **Purpose** | Prints sequences of printable characters in a file |
| **Platform · Cost** | Linux/macOS (binutils), Windows via WSL · Free |
| **Level** | Beginner |
| **When to use** | Always, first |

```bash
strings -n 6 gatekeeper
```

### objdump

| | |
|---|---|
| **Docs** | [GNU binutils: objdump](https://sourceware.org/binutils/docs/binutils/objdump.html) |
| **Purpose** | Disassembles executables and shows their sections and headers |
| **Platform · Cost** | Linux/macOS (binutils), Windows via WSL · Free |
| **Level** | Intermediate |
| **When to use** | A quick look at assembly without opening Ghidra; checking sections |
| **Alternative** | Ghidra's Listing view; [Compiler Explorer](https://godbolt.org/) to see how C turns into assembly |

```bash
objdump -d -M intel gatekeeper | less      # disassemble with Intel syntax
objdump -h gatekeeper                      # list sections (.text = code, .rodata = constants, .data = variables)
```

---

## F. Recommended learning resources

| Resource | Type | Why it's useful |
|---|---|---|
| [Compiler Explorer (godbolt.org)](https://godbolt.org/) | Browser tool | Type C on the left, see assembly on the right: the best way to *learn* assembly. |
| [Dogbolt decompiler explorer](https://dogbolt.org/) | Browser tool | Upload a small binary and compare output from several decompilers. |
| [crackmes.one](https://crackmes.one/) | Practice (account to upload/comment) | Community "crackme" programs made to be reversed, rated by difficulty. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | Practice (free account) | Filter by Reverse Engineering; gentle beginner binaries. |
| [OverTheWire: Leviathan](https://overthewire.org/wargames/leviathan/) | Practice (no account) | Short wargame introducing basic reversing on Linux. |
| [Ghidra Getting Started](https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md) | Official docs | Installation and first steps. |
| [pwn.college](https://pwn.college/) | Free course (account) | Arizona State University's free dojos, including reverse engineering modules. |
| [CS50x](https://cs50.harvard.edu/x/) | Free course | Learn C properly; it makes decompiled code readable. |

---

## G. Mini practice exercises

### Exercise 1: Strings reveal secrets (your own program)

- **Objective:** See why hard-coded secrets in programs are a bad idea.
- **Given:** Save as `gate.c`:

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char input[64];
    printf("Password: ");
    if (fgets(input, sizeof input, stdin) == NULL) return 1;
    input[strcspn(input, "\n")] = '\0';
    if (strcmp(input, "FLAG{strings_sees_all}") == 0)
        puts("Access granted.");
    else
        puts("Access denied.");
    return 0;
}
```

  Compile: `gcc gate.c -o gate` (Linux, macOS, or WSL on Windows).
- **Hints:** Don't look at the source again. Pretend you only have `gate`. Run `strings gate`.
- **Learning outcome:** Compiled programs keep string constants readable. `strings` is always step one.
- **Solution:** `strings gate | grep FLAG` prints `FLAG{strings_sees_all}`. Stretch: open `gate` in Ghidra, find `main`, and compare the decompiled code with your source.

### Exercise 2: Invert the check

- **Objective:** Reverse a transformation from decompiled code.
- **Given:** Fictional decompiler output from a challenge binary:

```c
char key[10] = {79, 80, 69, 78, 83, 69, 83, 65, 77, 69};

int check(char *input) {
    for (int i = 0; i < 10; i++) {
        if ((input[i] ^ 0x20) != key[i]) return 0;
    }
    return 1;
}
```

- **Hints:** If `input[i] ^ 0x20 == key[i]`, then `input[i] == key[i] ^ 0x20`. Convert the numbers to ASCII first, or write two lines of Python.
- **Learning outcome:** You invert the program's logic instead of guessing.
- **Solution:** `key` is `OPENSESAME`; XOR with `0x20` flips the case of ASCII letters, so the password is **`opensesame`**.

```python
key = [79, 80, 69, 78, 83, 69, 83, 65, 77, 69]
print("".join(chr(k ^ 0x20) for k in key))
```

### Exercise 3: See C become assembly

- **Objective:** Connect C control flow to assembly.
- **Given:** In [Compiler Explorer](https://godbolt.org/), choose C and x86-64 gcc, and type:

```c
int is_adult(int age) { if (age >= 18) return 1; return 0; }
```

- **Hints:** Find the `cmp` instruction and the conditional jump (or `setg`/`setge`-style instruction, depending on optimisation). Try adding `-O2` in the compiler options.
- **Learning outcome:** You recognise how an `if` looks in assembly and how optimisation changes it.
- **Solution:** Without optimisation you'll see the comparison with `17` or `18` and a jump; with `-O2` the compiler often removes the jump and uses `setg` to produce the result directly.

### Exercise 4: A real crackme

- **Objective:** Apply the full workflow.
- **Given:** Any beginner-rated (difficulty 1.0–1.5) crackme on [crackmes.one](https://crackmes.one/search) for your OS, or a beginner Reverse Engineering challenge in the [CyLab library](https://learn.cylabacademy.org/library).
- **Learning outcome:** End-to-end RE on someone else's program.
- **Solution reference:** crackmes.one lists community-submitted writeups for many crackmes; CyLab challenges have hints.

---

## H. What to learn next

| Stage | Learn | Resources |
|---|---|---|
| **Beginner** | `strings`, `file`, Ghidra basics, JADX, reading simple decompiled C | Exercises above, [CyLab library](https://learn.cylabacademy.org/library), [Leviathan](https://overthewire.org/wargames/leviathan/) |
| **Intermediate** | x86-64 assembly, GDB, calling conventions, unpacking UPX, Python solver scripts | [crackmes.one](https://crackmes.one/), [pwn.college](https://pwn.college/), [Compiler Explorer](https://godbolt.org/) |
| **Advanced** | Anti-debugging, obfuscation, symbolic execution (angr), Z3, malware analysis | Advanced RE [writeups](https://ctftime.org/writeups), [Root-Me Cracking](https://www.root-me.org/en/Challenges/) |

**Related guides:** [07 · Binary exploitation](07-BINARY-EXPLOITATION.md) · [Linux essentials](../tools/LINUX-ESSENTIALS.md) · [Installable tools](../tools/INSTALLABLE-TOOLS.md)

---

[← 05 · Web exploitation](05-WEB-EXPLOITATION.md) &nbsp;|&nbsp; [07 · Binary exploitation →](07-BINARY-EXPLOITATION.md)
