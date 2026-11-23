# 02 · Cryptography

[Home](../../README.md) › [Categories](../CATEGORIES_OVERVIEW.md) › **Cryptography**
&nbsp;·&nbsp; Presentation: slides 13–14 (live Caesar slider on 14) &nbsp;·&nbsp; [← 01 · OSINT](01-OSINT.md) · [03 · Steganography →](03-STEGANOGRAPHY.md)

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

You log into your university portal. Your browser shows a padlock. Your password travels across the café Wi-Fi, but the person next to you sniffing traffic sees only gibberish. The university's database doesn't even store your password; it stores a fingerprint of it. Three different cryptographic ideas just protected you before your coffee cooled.

### What it is

**Cryptography** is the science of protecting information: keeping it **secret** (confidentiality), detecting **tampering** (integrity) and proving **who sent it** (authenticity). In CTFs, crypto challenges give you something scrambled and ask you to recover the original, usually by spotting a weakness: a classic cipher, a reused key, a too-small number, or something that was never encrypted at all, only *encoded*.

### Where you meet it in real life

- **HTTPS** (the padlock): encrypts traffic between your browser and websites.
- **Messaging apps** with end-to-end encryption.
- **Password storage:** good systems store salted hashes, not passwords.
- **Digital signatures:** software updates, banking apps and e-passports prove they haven't been tampered with.
- **Disk encryption:** BitLocker, FileVault and phone encryption protect a lost laptop.

### Why it's interesting

It mixes puzzles, history (Caesar, Enigma) and maths. Beginner challenges feel like escape-room codes; advanced ones are genuine research.

### How it relates to cybersecurity

Almost every security mechanism depends on cryptography being used **correctly**. Most real-world breaks aren't the maths failing. They're people using encoding instead of encryption, reusing keys, rolling their own algorithms or storing passwords badly. CTFs train you to spot exactly those mistakes.

### The three words you must not mix up

| | **Encoding** | **Encryption** | **Hashing** |
|---|---|---|---|
| Purpose | Represent data in another format | Keep data secret | Create a fixed-size fingerprint |
| Needs a key? | ❌ No | ✅ Yes | ❌ No (but passwords should use a *salt*) |
| Reversible? | ✅ Anyone can reverse it | ✅ Only with the key | ❌ One-way by design |
| Examples | Base64, hex, binary, URL encoding | AES, ChaCha20, RSA | SHA-256, SHA-3; bcrypt/Argon2 for passwords |
| CTF tell | Looks scrambled but decodes instantly | Needs a key or a weakness | Fixed length hex string (e.g. 64 chars for SHA-256) |

> [!IMPORTANT]
> **Base64 is encoding, not encryption.** It has no key. Anyone can decode it in one click. If a system "protects" a password with Base64, it isn't protected.

---

## B. Prerequisites

| Level | What | Why |
|---|---|---|
| **Essential** | Curiosity and pattern spotting | Most beginner challenges are about recognising *what* you're looking at. |
| **Essential** | Number systems: decimal, binary, hexadecimal | Computers store everything as numbers. Explained in section D. |
| **Helpful** | Basic Python | Automates trying 26 shifts or 256 keys in two lines. |
| **Helpful** | The idea of ASCII (letters ↔ numbers) | `A` = 65, `a` = 97. See [Glossary: ASCII](../glossary/CYBERSECURITY-GLOSSARY.md#ascii). |
| **Advanced** | Modular arithmetic, prime numbers | Needed for RSA and Diffie–Hellman challenges. CryptoHack teaches these from scratch. |
| **Advanced** | Block cipher modes (ECB, CBC, CTR) | For intermediate AES challenges. |

- **Programming:** Python is the language of CTF crypto. Not required for your first challenges (CyberChef covers them), but it becomes essential quickly.
- **Linux:** not required.
- **Networking:** not required.
- **Learned while solving:** number systems, ASCII, XOR, frequency analysis, basic Python.

---

## C. Understanding the challenges

### What a typical challenge looks like

> *(Fictional example written for this guide.)*
> **"Ancient Secrets" · 50 points**
> Julius left us a note: `MSHN{iybal_mvyjl_dpuz}`
> Flag format: `FLAG{...}`

The format `XXXX{...}` with letters shifted, curly braces and underscores untouched is a giant hint: a letter-shifting cipher. Since we know the plaintext starts with `FLAG`, `F → M` means a shift of 7.

### What you're usually given

| Given | Example |
|---|---|
| A string in the description | `RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259` |
| A text file | `ciphertext.txt`, sometimes with a "public key" |
| The encryption script | `encrypt.py`: you're meant to read it and find the flaw |
| A network service | `nc challenge.example 1337`: you talk to an oracle that encrypts/decrypts for you |

### Clues that identify the format

| You see | Probably | Why |
|---|---|---|
| `A–Z a–z 0–9 + /`, length multiple of 4, maybe `=` at the end | **Base64** | 64-symbol alphabet; `=` is padding |
| Only `0–9 a–f`, even length | **Hexadecimal** | Two hex digits per byte |
| Only `0` and `1` in groups of 8 | **Binary** | One byte per group |
| Letters only, punctuation kept, `{ }` in place | **Caesar / ROT13 / substitution** | Classic ciphers only change letters |
| Dots and dashes | **Morse code** | |
| 32 hex chars | MD5 hash | 128 bits |
| 64 hex chars | SHA-256 hash | 256 bits |
| Huge numbers named `n`, `e`, `c` | **RSA** | Modulus, public exponent, ciphertext |
| `-----BEGIN PUBLIC KEY-----` | A PEM-encoded key | |

### Common challenge patterns

1. **Pure encoding** (Base64, hex, binary), often **layered** several times.
2. **Classical ciphers:** Caesar, ROT13, Vigenère, substitution, Atbash.
3. **XOR** with a short or repeating key.
4. **Hash cracking:** find which common word produces a given hash (only on challenge hashes).
5. **Broken modern crypto:** RSA with tiny primes, AES in ECB mode leaking patterns, reused nonces.

### Common beginner mistakes

| Mistake | Better habit |
|---|---|
| Thinking Base64 is encryption | It's encoding. Decode it and look again. |
| Decoding once and giving up | Output still looks encoded? Decode again. CyberChef's **Magic** operation detects layers. |
| Trying to "decrypt" a hash | Hashes are one-way. You can only guess inputs and compare. |
| Inventing your own crypto in real projects | Use well-reviewed libraries. CTFs show why home-made crypto breaks. |
| Ignoring the provided script | The flaw is almost always visible in the source. |

---

## D. Step-by-step methodology

### 1. Identify before you decode

**Why:** the right tool depends entirely on what you're looking at. Use the clue table above, or paste the text into [dCode's Cipher Identifier](https://www.dcode.fr/cipher-identifier) or CyberChef's **Magic**.

Ask: *Which characters appear? How long is it? Does it look like the flag format with letters swapped?*

### 2. Try the free wins

**Why:** a large share of beginner challenges are just encodings.

In CyberChef try **From Base64**, **From Hex**, **From Binary**, **ROT13**. If the output looks *more* structured but not readable, it's probably another layer.

### 3. Use what you know about the plaintext

**Why:** flags have a known format. If the ciphertext starts with 4 letters before `{`, those 4 letters are probably `FLAG` (or the competition's prefix). This "known plaintext" reveals Caesar shifts and XOR keys instantly.

### 4. Brute-force small key spaces

**Why:** Caesar has 25 keys, single-byte XOR 255. A computer tries them all instantly. Look for the output containing `FLAG{`.

### 5. Read the source code if given

**Why:** crypto challenges with scripts are about finding the *one* mistake: a key reused, a random number seeded with the time, a prime that's too small.

### 6. Search the weakness, not the flag

**Why:** "RSA small e attack" or "AES ECB pattern" leads to explanations you'll reuse. Learning the attack is the point.

### Concepts you'll use constantly

**Number systems.** The letter `A` is the number 65 in ASCII. Written in other bases:

| Base | `A` | `F` | `{` |
|---|---|---|---|
| Decimal (10) | 65 | 70 | 123 |
| Hexadecimal (16) | 41 | 46 | 7b |
| Binary (2) | 01000001 | 01000110 | 01111011 |

**Base64** takes 3 bytes (24 bits), splits them into 4 groups of 6 bits and maps each to one of 64 characters. That's why the output is ⅓ longer and its length is a multiple of 4. `Man` → `TWFu`, `Hi` → `SGk=` (padding added because 2 bytes isn't a multiple of 3).

**Caesar cipher and ROT13.** Shift each letter by *k* positions. ROT13 is Caesar with *k* = 13; applying it twice returns the original. `HELLO` → ROT13 → `URYYB`.

**Substitution cipher.** Each letter maps to a different letter (not a fixed shift). 26! possible keys, far too many to brute-force, but **frequency analysis** breaks it: in English, `E`, `T`, `A`, `O` are the most common letters, so the most common ciphertext letters probably stand for them.

**XOR (exclusive or).** Compares bits: same → 0, different → 1. Key property: `(plaintext XOR key) XOR key = plaintext`. Applying the same key twice undoes it, so XOR with a known key is trivial to reverse, and with a short key, easy to brute-force.

```
  01000001   'A' (0x41)
⊕ 00101010   key 0x2a
= 01101011   0x6b ('k')
```

**Symmetric vs asymmetric encryption.**

| | Symmetric | Asymmetric (public-key) |
|---|---|---|
| Keys | One shared secret key | A key pair: public (share it) and private (keep it) |
| Speed | Fast | Slow |
| Examples | AES, ChaCha20 | RSA, elliptic-curve (ECDH, Ed25519) |
| Used for | Encrypting the actual data | Exchanging keys, digital signatures |

HTTPS uses both: asymmetric crypto to agree on a key, then symmetric crypto for the data.

**Hashing and password storage.** A hash function turns any input into a fixed-size fingerprint; changing one character changes the whole output:

```
SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-256("Hello") = 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
```

Good systems store passwords with a slow, **salted** password-hashing algorithm (bcrypt, scrypt, Argon2). A **salt** is a random value added to each password so identical passwords get different hashes and precomputed tables don't work. Fast hashes like MD5 or plain SHA-256 are *not* suitable for passwords; see the [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

---

## E. Tools and their usage

### CyberChef

| | |
|---|---|
| **Website** | <https://gchq.github.io/CyberChef/> |
| **Documentation** | [CyberChef wiki](https://github.com/gchq/CyberChef/wiki) (each operation also has built-in help) |
| **Purpose** | "The cyber Swiss army knife": hundreds of encode/decode/crypto/compression operations chained into recipes |
| **Problem it solves** | Decoding and transforming data without writing code |
| **Platform** | Browser (runs locally in your browser; can also be downloaded and opened offline) |
| **Type · Cost** | Browser-based · Free, open source (by GCHQ) |
| **Level** | Beginner → advanced |
| **When to use** | First stop for any encoded-looking string |
| **Alternative** | dCode (classic ciphers), Python (anything custom) |

**Try it:** paste `RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259` into Input, drag **From Base64** into the Recipe. Then try the **Magic** operation on unknown input: it guesses the encoding chain for you.

### dCode

| | |
|---|---|
| **Website** | <https://www.dcode.fr/> |
| **Documentation** | Each tool page explains the cipher, with examples: e.g. [Caesar](https://www.dcode.fr/caesar-cipher), [Frequency analysis](https://www.dcode.fr/frequency-analysis), [Substitution](https://www.dcode.fr/monoalphabetic-substitution), [XOR](https://www.dcode.fr/xor-cipher) |
| **Purpose** | Hundreds of solvers for classical ciphers, codes and puzzles |
| **Problem it solves** | "I don't know what cipher this is" ([Cipher Identifier](https://www.dcode.fr/cipher-identifier)) and automatic solving of classic ciphers |
| **Platform** | Browser |
| **Type · Cost** | Browser-based · Free (with ads) |
| **Level** | Beginner |
| **When to use** | Classical ciphers, unusual codes (Morse, Braille, pigpen…) |
| **Alternative** | [quipqiup](https://quipqiup.com/) for substitution ciphers; CyberChef |

**Try it:** paste `MSHN{iybal_mvyjl_dpuz}` into the Caesar tool and press *Decrypt* with "brute-force all shifts". Find the line that reads like English.

### CryptoHack

| | |
|---|---|
| **Website** | <https://cryptohack.org/> |
| **Documentation** | [Courses](https://cryptohack.org/courses/), starting with *Introduction to CryptoHack* |
| **Purpose** | A free learning platform that teaches modern cryptography through challenges |
| **Problem it solves** | Going from "I can decode Base64" to understanding XOR, modular arithmetic, AES and RSA |
| **Platform** | Browser (you solve with Python on your own machine) |
| **Type · Cost** | Browser-based platform · Free, account required |
| **Level** | Beginner → advanced |
| **When to use** | After your first few crypto challenges, to learn properly |
| **Alternative** | [Cryptopals](https://cryptopals.com/), a classic set of exercises, harder and less guided |

### Python

| | |
|---|---|
| **Website** | <https://www.python.org/> |
| **Documentation** | [Python docs](https://docs.python.org/3/), [Tutorial](https://docs.python.org/3/tutorial/), [`base64` module](https://docs.python.org/3/library/base64.html) |
| **Purpose** | General-purpose programming language, the standard for CTF scripting |
| **Problem it solves** | Brute-forcing keys, handling bytes, automating anything CyberChef can't |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Beginner (basics) → advanced |
| **Installation** | [python.org/downloads](https://www.python.org/downloads/). On Windows, tick "Add python.exe to PATH" in the installer. Details: [Installable tools](../tools/INSTALLABLE-TOOLS.md#python). |
| **Alternative** | None worth switching to for CTFs. |

**Try it:** brute-force a Caesar cipher:

```python
ct = "MSHN{iybal_mvyjl_dpuz}"
for k in range(26):
    pt = "".join(
        chr((ord(c) - base - k) % 26 + base) if c.isalpha() else c
        for c in ct
        for base in [65 if c.isupper() else 97]
    )
    print(k, pt)
```

And reverse XOR with a known single-byte key:

```python
data = bytes.fromhex("6c666b6d51524558755e5d43494f755f444e454f5957")
print(bytes(b ^ 0x2a for b in data))
```

### OpenSSL

| | |
|---|---|
| **Website** | <https://openssl-library.org/> |
| **Documentation** | [`openssl` command manual](https://docs.openssl.org/master/man1/openssl/) |
| **Purpose** | Command-line toolkit for real-world cryptography: encryption, hashing, keys, certificates |
| **Problem it solves** | Working with real formats (PEM keys, certificates, AES-encrypted files) that appear in intermediate challenges |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Intermediate |
| **Installation** | Pre-installed on most Linux and macOS systems. On Windows, Git for Windows ships it inside **Git Bash**. |
| **Alternative** | Python's `cryptography` library |

**Try it:**

```bash
echo -n hello | openssl dgst -sha256                     # hash (matches the value above)
openssl rand -hex 16                                     # 16 random bytes as hex
openssl enc -aes-256-cbc -pbkdf2 -in note.txt -out note.enc   # encrypt your own file (asks for a password)
openssl enc -d -aes-256-cbc -pbkdf2 -in note.enc              # decrypt it again
openssl x509 -in cert.pem -noout -text                   # read a certificate
```

---

## F. Recommended learning resources

| Resource | Type | Why it's useful |
|---|---|---|
| [CryptoHack courses](https://cryptohack.org/courses/) | Free platform (account) | The best structured path from basics to RSA and AES. |
| [Cryptopals](https://cryptopals.com/) | Free exercises | Classic hands-on sets that build real attacks step by step. |
| [Cryptography I (Dan Boneh, Stanford, via Coursera)](https://www.coursera.org/learn/crypto) | Video course (Coursera; check current enrolment options) | University-level theory, explained clearly. |
| [CyberChef wiki](https://github.com/gchq/CyberChef/wiki) | Official docs | How to build recipes and use advanced operations. |
| [dCode](https://www.dcode.fr/) | Reference | Every classic cipher explained with examples. |
| [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) | Official guidance | How passwords *should* be stored, and why. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | Practice (free account) | Filter by Cryptography; many beginner challenges. |
| [OverTheWire: Krypton](https://overthewire.org/wargames/krypton/) | Practice (no account) | Classical-cipher wargame played over SSH. |

---

## G. Mini practice exercises

All strings below were generated for this guide.

### Exercise 1: Three formats

- **Objective:** Recognise and decode Base64, hex and binary.
- **Given:**
  1. `RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259`
  2. `464c41477b6865785f69735f6a7573745f6e756d626572737d`
  3. `01000011 01010100 01000110`
- **Hints:** Use the clue table in section C. In CyberChef: *From Base64*, *From Hex*, *From Binary*.
- **Learning outcome:** You identify formats by their character set and length.
- **Solution:** 1 → `FLAG{base64_is_not_encryption}` · 2 → `FLAG{hex_is_just_numbers}` · 3 → `CTF`

### Exercise 2: Julius's note

- **Objective:** Break a Caesar cipher with known plaintext and with brute force.
- **Given:** `MSHN{iybal_mvyjl_dpuz}`
- **Hints:** What does `M` become if the flag starts with `F`? Or run the Python loop from section E.
- **Learning outcome:** Small key spaces can always be brute-forced; known plaintext finds the key instantly.
- **Solution:** Shift 7 (`F`→`M`). Plaintext: `FLAG{brute_force_wins}`.

### Exercise 3: XOR is its own undo button

- **Objective:** Reverse a single-byte XOR.
- **Given:** hex `6c666b6d51524558755e5d43494f755f444e454f5957`, key `0x2a`.
- **Hints:** In CyberChef: *From Hex* → *XOR* (key `2a`, scheme *Hex*). Or the Python snippet in section E.
- **Learning outcome:** XOR with a known key is reversible by applying the same key.
- **Solution:** `FLAG{xor_twice_undoes}`. Stretch: pretend you don't know the key, try all 256 and print only outputs starting with `FLAG`.

### Exercise 4: Hash fingerprints

- **Objective:** See that hashes are one-way and sensitive to every bit.
- **Given:** The words `hello` and `Hello`.
- **Hints:** CyberChef *SHA2* (256), or `echo -n hello | openssl dgst -sha256` (the `-n` stops a newline being hashed).
- **Learning outcome:** Hashes change completely with a one-letter difference; there's no "decrypt" button.
- **Solution:** see the two SHA-256 values in section D.

---

## H. What to learn next

| Stage | Learn | Resources |
|---|---|---|
| **Beginner** | Encodings, Caesar/ROT13, substitution, XOR, hashes | Exercises above, [CyLab library](https://learn.cylabacademy.org/library), [Krypton](https://overthewire.org/wargames/krypton/) |
| **Intermediate** | Vigenère, repeating-key XOR, modular arithmetic, RSA basics, AES modes (why ECB is bad) | [CryptoHack](https://cryptohack.org/courses/), [Cryptopals sets 1–2](https://cryptopals.com/) |
| **Advanced** | RSA attacks, padding oracles, elliptic curves, lattice methods | [CryptoHack](https://cryptohack.org/) advanced courses, [Cryptography I](https://www.coursera.org/learn/crypto) |

**Related guides:** [08 · Miscellaneous](08-MISCELLANEOUS.md) (esoteric encodings) · [Cheat sheets: encodings](../resources/CHEAT-SHEETS.md#encodings-at-a-glance) · [Browser-based tools](../tools/BROWSER-BASED-TOOLS.md)

---

[← 01 · OSINT](01-OSINT.md) &nbsp;|&nbsp; [03 · Steganography →](03-STEGANOGRAPHY.md)
