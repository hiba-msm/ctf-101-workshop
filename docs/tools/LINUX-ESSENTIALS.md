# Linux Essentials for CTFs

[Home](../../README.md) › **Linux essentials** &nbsp;·&nbsp; See also: [Installable tools](INSTALLABLE-TOOLS.md) · [Browser-based tools](BROWSER-BASED-TOOLS.md) · [Cheat sheets](../resources/CHEAT-SHEETS.md)

Most CTF tools and challenge servers run Linux. You don't need to be an expert, but about 30 commands will carry you a long way. This page teaches them with CTF-style examples.

**Where to type these commands:**
- **Linux / macOS:** open *Terminal*.
- **Windows:** install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (`wsl --install`) for a real Ubuntu terminal, or use **Git Bash** (from [Git for Windows](https://git-scm.com/downloads)), which includes many of these commands (not `strings`, `gdb` or `nc`).
- **No install at all:** the [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) wargame gives you a remote Linux shell over SSH.

> [!TIP]
> Paste any confusing command into [explainshell.com](https://explainshell.com/) to see what each part means. Use `man <command>` (manual) or `<command> --help` for details.

---

## Contents

- [1. Moving around](#1-moving-around)
- [2. Looking at files](#2-looking-at-files)
- [3. Inspecting unknown files](#3-inspecting-unknown-files)
- [4. Searching](#4-searching)
- [5. Pipes and redirection](#5-pipes-and-redirection)
- [6. Encoding, decoding and hashing](#6-encoding-decoding-and-hashing)
- [7. Permissions and running programs](#7-permissions-and-running-programs)
- [8. Archives](#8-archives)
- [9. Talking to servers](#9-talking-to-servers)
- [10. Windows equivalents](#10-windows-equivalents)
- [Practice](#practice)

---

## 1. Moving around

| Command | What it does | Example |
|---|---|---|
| `pwd` | Print working directory (where am I?) | `pwd` → `/home/student` |
| `ls` | List files | `ls -la` (long format, **including hidden files** starting with `.`) |
| `cd` | Change directory | `cd challenges` · `cd ..` (up one) · `cd ~` (home) |
| `mkdir` | Make a directory | `mkdir ctf-notes` |
| `cp` / `mv` / `rm` | Copy / move or rename / remove | `cp evidence.img work.img` |

> [!CAUTION]
> `rm` deletes immediately; there is no recycle bin. Double-check before using `rm -r`.

**CTF tip:** flags love hiding in **hidden files**. Always use `ls -la`.

## 2. Looking at files

| Command | What it does | Example |
|---|---|---|
| `cat` | Print a whole file | `cat flag.txt` |
| `less` | Scroll through a long file (`q` quits, `/word` searches) | `less auth.log` |
| `head` / `tail` | First / last lines | `head -n 20 log.txt` · `tail -n 5 log.txt` |
| `wc` | Count lines, words, bytes | `wc -l auth.log` |

Odd file names: `cat ./-file` (a name starting with `-`), `cat "file with spaces"`.

## 3. Inspecting unknown files

The core forensics/stego/RE triage. See [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md#d-step-by-step-methodology).

| Command | What it does | Example |
|---|---|---|
| `file` | Identify type from content (magic bytes) | `file mystery` → `PNG image data, 800 x 600…` |
| `strings` | Show readable text inside binary files | `strings -n 8 mystery \| grep -i flag` |
| `xxd` | Hex dump | `xxd mystery \| head` · `xxd -r -p hex.txt out.bin` (hex back to binary) |
| `exiftool` | Metadata | `exiftool photo.jpg` |
| `binwalk` | Find embedded files | `binwalk -e firmware.bin` |

## 4. Searching

| Command | What it does | Example |
|---|---|---|
| `grep` | Find lines matching text or a pattern | `grep -i "password" notes.txt` |
| | Recursive search in a folder | `grep -r "FLAG{" .` |
| | Regular expression, only the match | `grep -oE "FLAG\{[^}]+\}" dump.txt` |
| | Invert / count | `grep -v "200 OK" access.log` · `grep -c "Failed" auth.log` |
| `find` | Find files by name, size, owner… | `find / -name "*flag*" 2>/dev/null` |
| | By size | `find . -size 1033c` (exactly 1033 bytes) |

`2>/dev/null` hides "Permission denied" errors so you only see results.

## 5. Pipes and redirection

The superpower of the command line: chain small tools together.

| Symbol | Meaning | Example |
|---|---|---|
| `\|` | Send output of one command into the next | `cat auth.log \| grep Failed \| wc -l` |
| `>` | Write output to a file (overwrite) | `strings mystery > out.txt` |
| `>>` | Append to a file | `echo "step 3 done" >> notes.txt` |
| `<` | Use a file as input | `./program < input.txt` |

Useful pipe partners: `sort`, `uniq -c` (count duplicates), `cut`, `tr`, `rev` (reverse text).

```bash
# Which IPs failed to log in most often?
grep "Failed password" auth.log | grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" | sort | uniq -c | sort -rn
```

## 6. Encoding, decoding and hashing

| Command | What it does |
|---|---|
| `echo -n "text" \| base64` | Encode to Base64 (`-n` = no trailing newline) |
| `echo "RkxBRw==" \| base64 -d` | Decode Base64 → `FLAG` |
| `echo "464c4147" \| xxd -r -p` | Hex → text → `FLAG` |
| `echo "URYYB" \| tr 'A-Za-z' 'N-ZA-Mn-za-m'` | ROT13 → `HELLO` |
| `sha256sum file` / `md5sum file` | Hash a file (integrity checks) |

More in [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md).

## 7. Permissions and running programs

```console
$ ls -l challenge
-rw-r--r-- 1 student student 16712 Nov 20 10:00 challenge
```

`r` = read, `w` = write, `x` = execute, for **owner**, **group**, **others**. No `x`? Add it:

```bash
chmod +x challenge
./challenge          # run a program in the current folder
```

`sudo` runs a command as administrator. Use it for installing software, not for running challenge binaries.

## 8. Archives

| Format | Extract |
|---|---|
| `.zip` | `unzip file.zip` |
| `.tar.gz` / `.tgz` | `tar -xzf file.tar.gz` |
| `.tar` | `tar -xf file.tar` |
| `.gz` | `gunzip file.gz` |
| `.7z` | `7z x file.7z` (install `p7zip-full`) |

**CTF tip:** challenges sometimes nest archives many levels deep. Run `file` after each step, since the extension may lie.

## 9. Talking to servers

| Command | What it does | Example |
|---|---|---|
| `ssh` | Log into a remote shell | `ssh bandit0@bandit.labs.overthewire.org -p 2220` (from Bandit level 0) |
| `nc` (netcat) | Raw connection to a challenge port | `nc challenge.example 1337` |
| `curl` | HTTP requests | `curl -i http://localhost:3000/` |

Only connect to challenge servers and systems you're authorised to use.

## 10. Windows equivalents

If you're in PowerShell rather than a Linux shell:

| Linux | PowerShell |
|---|---|
| `ls -la` | `Get-ChildItem -Force` (or `dir -Force`) |
| `cat file` | `Get-Content file` |
| `grep text file` | `Select-String text file` |
| `head -n 5` / `tail -n 5` | `Get-Content file -TotalCount 5` / `-Tail 5` |
| `sha256sum file` | `Get-FileHash file -Algorithm SHA256` |
| `file` / `strings` / `xxd` | No built-in equivalent: use WSL, Git Bash (`file`, `xxd`), or [HexEd.it](https://hexed.it/) |
| `curl` | `curl.exe` (plain `curl` may be an alias for `Invoke-WebRequest`) |

---

## Practice

| Resource | Why |
|---|---|
| [OverTheWire: Bandit](https://overthewire.org/wargames/bandit/) | **The** beginner Linux wargame: each level teaches a command. Levels 0–10 cover everything on this page. No account needed. |
| [explainshell](https://explainshell.com/) | Understand any command you meet in a writeup. |
| [The Missing Semester of Your CS Education (MIT)](https://missing.csail.mit.edu/) | Free lectures on the shell, scripting, Git and more. |
| [The Linux Command Line (free book)](https://linuxcommand.org/tlcl.php) | A complete, beginner-friendly book, free to read online. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | "General Skills" challenges practise exactly these commands. |

---

[← Installable tools](INSTALLABLE-TOOLS.md) &nbsp;|&nbsp; [Home →](../../README.md)
