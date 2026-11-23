# Cybersecurity Glossary

[Home](../../README.md) › **Glossary**

Plain-language definitions of the terms used in the workshop and in this repository. Each term links to the guide where it matters most.

**Jump to:** [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [H](#h) · [I](#i) · [J](#j) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [V](#v) · [W](#w) · [X](#x)

---

## A

### Access control
Rules deciding *who* may do *what*. "Broken access control" (users reaching data or functions they shouldn't) is #1 in the OWASP Top 10:2025. → [Web](../categories/05-WEB-EXPLOITATION.md)

### AES
Advanced Encryption Standard: the most widely used **symmetric** encryption algorithm. → [Crypto](../categories/02-CRYPTOGRAPHY.md)

### ASCII
A standard that maps characters to numbers: `A` = 65, `a` = 97, `{` = 123. Many CTF puzzles hide letters as ASCII numbers. → [Crypto](../categories/02-CRYPTOGRAPHY.md#concepts-youll-use-constantly)

### ASLR
Address Space Layout Randomisation: the operating system places the stack, heap and libraries at random addresses each run, making memory bugs harder to exploit. → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

### Assembly
Human-readable form of machine code (`mov`, `cmp`, `jmp`…). What a disassembler shows you. → [RE](../categories/06-REVERSE-ENGINEERING.md#assembly-in-five-minutes)

### Attack-Defense CTF
A competition format where each team defends its own servers while attacking other teams'. → [CTF fundamentals](../CTF_FUNDAMENTALS.md#types-of-ctf)

### Authentication
Proving *who you are* (password, fingerprint, two-factor code).

### Authorisation
Deciding *what you're allowed to do* once identified. Also: the **permission** you need before testing any system.

## B

### Base64
An **encoding** that represents binary data using 64 printable characters (`A–Z a–z 0–9 + /`, with `=` padding). Not encryption: anyone can decode it. → [Crypto](../categories/02-CRYPTOGRAPHY.md)

### Binary (number system)
Base 2: only 0 and 1. One byte = 8 bits, e.g. `01000001` = 65 = `A`.

### Binary (file)
A compiled program or any non-text file.

### Bit plane
An image made from just one bit (e.g. the lowest) of one colour channel. Reveals LSB-hidden content. → [Stego](../categories/03-STEGANOGRAPHY.md)

### Black hat / white hat / grey hat
Attackers who act illegally / ethical hackers working with permission / those in between (acting without permission, even with good intentions, is still illegal).

### Blue team / red team
Defenders / authorised attackers who simulate real adversaries.

### Brute force
Trying every possible key or password. Practical only when the key space is small (e.g. 25 Caesar shifts).

### Buffer overflow
Writing more data into a memory buffer than it can hold, overwriting neighbouring memory. → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

### Bug bounty
A programme where organisations reward people for responsibly reporting vulnerabilities, **within published rules**.

## C

### Caesar cipher
Shifts each letter by a fixed number. ROT13 is Caesar with shift 13. → [Crypto](../categories/02-CRYPTOGRAPHY.md)

### Canary (stack canary)
A secret value placed before a function's return address; if an overflow changes it, the program aborts. → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

### Chain of custody
A record of who handled evidence, when and how, which proves it wasn't tampered with. → [Forensics](../categories/04-DIGITAL-FORENSICS.md)

### Cipher
An algorithm for encrypting and decrypting.

### Ciphertext / plaintext
Encrypted data / the original readable data.

### Client / server
The program asking (your browser) / the program answering (the website's computer). → [Web](../categories/05-WEB-EXPLOITATION.md#how-websites-work)

### Compiler
Translates source code into machine code.

### Cookie
A small piece of data a website stores in your browser and receives back with each request, often used for sessions. → [Web](../categories/05-WEB-EXPLOITATION.md#cookies-and-sessions)

### CTF (Capture The Flag)
A cybersecurity competition where you solve challenges to find secret strings ("flags"). → [CTF fundamentals](../CTF_FUNDAMENTALS.md)

### CVE
Common Vulnerabilities and Exposures: public IDs for known vulnerabilities (e.g. `CVE-2014-0160`, Heartbleed).

## D

### Decompiler
Turns machine code back into approximate source code (e.g. Ghidra's decompiler). → [RE](../categories/06-REVERSE-ENGINEERING.md)

### DevTools
The browser's built-in developer tools (`F12`). → [Browser tools](../tools/BROWSER-BASED-TOOLS.md#browser-developer-tools)

### Disk image
A bit-for-bit copy of a storage device, used in forensics. → [Forensics](../categories/04-DIGITAL-FORENSICS.md)

### DNS
Domain Name System: the internet's phone book, translating names like `example.com` into IP addresses. → [OSINT](../categories/01-OSINT.md#whois-rdap-and-dns-in-one-minute)

### Doxxing
Publishing someone's private information without consent. Harmful, and in many places illegal. Never part of a CTF.

## E

### Encoding
Representing data in a different format (Base64, hex, URL encoding). No key, fully reversible.

### Encryption
Making data unreadable without a key. → [Crypto](../categories/02-CRYPTOGRAPHY.md#the-three-words-you-must-not-mix-up)

### EXIF
Metadata format in photos: camera, date, sometimes GPS location. → [OSINT](../categories/01-OSINT.md)

### Exploit
Code or a technique that takes advantage of a vulnerability.

## F

### File carving
Recovering files from raw data by searching for their signatures. → [Forensics](../categories/04-DIGITAL-FORENSICS.md#file-carving-in-one-minute)

### File signature (magic bytes)
The first bytes of a file that identify its real type, e.g. `89 50 4E 47` = PNG. → [Stego](../categories/03-STEGANOGRAPHY.md#1-confirm-the-real-file-type)

### Flag
The secret string you submit to prove you solved a challenge, e.g. `FLAG{you_found_it}`.

### Format-string bug
Passing user input as the format argument to `printf`, which can leak or modify memory. → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

### Frequency analysis
Breaking substitution ciphers by comparing letter frequencies with a language's typical frequencies.

## H

### Hash
A fixed-size, one-way fingerprint of data (SHA-256, MD5). → [Crypto](../categories/02-CRYPTOGRAPHY.md)

### Heap
Memory a program requests at runtime (`malloc`). → [Pwn](../categories/07-BINARY-EXPLOITATION.md#1-understand-memory-first)

### Hexadecimal (hex)
Base 16, using `0–9` and `a–f`. One byte = two hex digits (`41` = 65 = `A`).

### HTTP / HTTPS
The protocol of the web / HTTP over an encrypted TLS connection. → [Web](../categories/05-WEB-EXPLOITATION.md#how-websites-work)

## I

### IDOR
Insecure Direct Object Reference: accessing someone else's data by changing an identifier (e.g. `?id=5` → `?id=6`). A form of broken access control.

### Incident response
The process of detecting, containing and recovering from a security incident.

### IP address
A numerical address identifying a device on a network (e.g. `192.0.2.10`).

## J

### Jeopardy CTF
The most common CTF format: a board of challenges in categories, each worth points. → [CTF fundamentals](../CTF_FUNDAMENTALS.md#types-of-ctf)

## L

### LSB (least significant bit)
The rightmost bit of a number. Changing it alters a value by only 1, so it's used to hide data in images. → [Stego](../categories/03-STEGANOGRAPHY.md)

## M

### Malware
Malicious software: viruses, ransomware, spyware, etc.

### Memory dump
A snapshot of a computer's RAM. → [Forensics](../categories/04-DIGITAL-FORENSICS.md#memory-forensics-in-one-minute)

### Metadata
"Data about data": a file's author, creation date, camera model, GPS position. Often hidden from normal view. → [OSINT](../categories/01-OSINT.md#2-inspect-the-file-before-searching-anything)

## N

### NX
"No-eXecute": memory protection that prevents data regions (like the stack) from being run as code.

### netcat (`nc`)
A command-line tool for raw network connections, often used to connect to CTF challenge servers.

## O

### OSINT
Open-Source Intelligence: investigation using publicly available information. → [OSINT](../categories/01-OSINT.md)

### OWASP
Open Worldwide Application Security Project: a non-profit producing free web-security resources such as the Top 10 and Juice Shop.

## P

### Packet / PCAP
A unit of network data / a file containing recorded packets. → [Forensics](../categories/04-DIGITAL-FORENSICS.md#network-traffic-in-one-minute)

### Parameterised query
A database query where user input is sent separately from the SQL code, preventing SQL injection. → [Web](../categories/05-WEB-EXPLOITATION.md#vulnerability-classes-conceptually)

### Penetration test (pentest)
An **authorised**, simulated attack on a system to find vulnerabilities before criminals do.

### Phishing
Tricking people into revealing information or running malware, usually via fake emails or sites.

### PIE
Position-Independent Executable: a program that can be loaded at a random address (works with ASLR).

### Port
A number identifying a service on a computer: 22 = SSH, 80 = HTTP, 443 = HTTPS, 53 = DNS.

### Proxy (intercepting)
A tool like Burp Suite or ZAP that sits between browser and server so you can inspect and modify traffic. → [Web](../categories/05-WEB-EXPLOITATION.md#burp-suite-community-edition)

### Pwn
CTF slang for binary exploitation, from "own" (to take control). → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

## R

### RDAP / WHOIS
Protocols for looking up domain registration data. RDAP is the modern replacement for WHOIS. → [OSINT](../categories/01-OSINT.md#icann-lookup-whois--rdap)

### Register
A tiny, very fast storage slot inside the CPU (`rax`, `rsp`…). → [RE](../categories/06-REVERSE-ENGINEERING.md#assembly-in-five-minutes)

### Responsible disclosure
Reporting a vulnerability privately to the organisation so it can be fixed before details are made public.

### Reverse engineering
Working out how something works from the finished product. → [RE](../categories/06-REVERSE-ENGINEERING.md)

### ROT13
Caesar cipher with shift 13; applying it twice gives back the original.

### RSA
A widely used **asymmetric** (public-key) algorithm based on the difficulty of factoring large numbers.

## S

### Salt
A random value added to each password before hashing, so identical passwords produce different hashes.

### Segmentation fault (segfault)
The operating system stopping a program that accessed memory it isn't allowed to. → [Pwn](../categories/07-BINARY-EXPLOITATION.md)

### Session
The server's memory of a logged-in user, usually tied to a cookie.

### Social engineering
Manipulating people rather than computers (e.g. phishing, pretexting phone calls).

### SQL injection (SQLi)
User input that changes the structure of a database query. Fixed with parameterised queries. → [Web](../categories/05-WEB-EXPLOITATION.md#vulnerability-classes-conceptually)

### Stack
Memory area for function calls and local variables, including return addresses. → [Pwn](../categories/07-BINARY-EXPLOITATION.md#1-understand-memory-first)

### Static / dynamic analysis
Examining a program without running it / while running it. → [RE](../categories/06-REVERSE-ENGINEERING.md)

### Steganography
Hiding the *existence* of a message inside another file. → [Stego](../categories/03-STEGANOGRAPHY.md)

### Symmetric / asymmetric encryption
One shared key / a public-private key pair. → [Crypto](../categories/02-CRYPTOGRAPHY.md#concepts-youll-use-constantly)

## T

### TLS
Transport Layer Security: the encryption protocol behind HTTPS.

### Traversal (directory/path)
Using `../` sequences to access files outside an intended folder. → [Web](../categories/05-WEB-EXPLOITATION.md#vulnerability-classes-conceptually)

### Two-factor authentication (2FA)
Logging in with two different proofs, e.g. a password plus a code from an app.

## V

### Virtual machine (VM)
A computer simulated in software: a safe place to run untrusted programs.

### Vulnerability
A weakness that can be exploited to cause harm.

## W

### Wargame
A permanent, self-paced series of hacking levels (e.g. OverTheWire Bandit).

### Writeup
A write-up explaining how a challenge was solved. → [Writeups](../resources/WRITEUPS-AND-LEARNING.md)

### WSL
Windows Subsystem for Linux: runs a real Linux environment inside Windows. → [Linux essentials](../tools/LINUX-ESSENTIALS.md)

## X

### XOR
Exclusive-or: a bit operation (same → 0, different → 1). XOR-ing twice with the same key restores the original. → [Crypto](../categories/02-CRYPTOGRAPHY.md#concepts-youll-use-constantly)

### XSS (cross-site scripting)
User input that ends up running as JavaScript in other users' browsers. Fixed by escaping output. → [Web](../categories/05-WEB-EXPLOITATION.md#vulnerability-classes-conceptually)

---

[← Home](../../README.md)
