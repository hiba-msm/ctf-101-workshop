# 30-Day Learning Roadmap

[Home](../../README.md) › **30-day roadmap** &nbsp;·&nbsp; Previous: [← 7-day roadmap](7-DAY-ROADMAP.md) &nbsp;·&nbsp; See also: [Practice platforms](PRACTICE-PLATFORMS.md)

**Goal:** in four weeks, go from beginner to someone who can **compete in a beginner CTF with a team**.

**Designed for students with other commitments:**
- About **5 sessions a week, 45–75 minutes each** (roughly 4–6 hours a week). Two rest days a week are built in.
- Each week has a **minimum** (if exam season hits) and a **stretch** goal.
- Everything listed is **free**. Accounts are needed only where noted.
- Already did the [7-day roadmap](7-DAY-ROADMAP.md)? Skim Week 1 and focus on its stretch goals.

---

## Overview

| Week | Theme | By the end you can… |
|---|---|---|
| 1 | Foundations | Use the Linux terminal, inspect files and explain how CTFs work |
| 2 | Beginner categories | Solve easy OSINT, crypto, stego and forensics challenges |
| 3 | Technical categories | Inspect web apps, read basic network traffic, open a binary in Ghidra and write small Python scripts |
| 4 | Apply your knowledge | Compete in a real beginner CTF with a team and write a writeup |

---

## Week 1: Foundations

**Focus:** basic Linux, terminal navigation, file inspection, CTF fundamentals.

| Session | Do | Time |
|---|---|---|
| 1 | Read [CTF fundamentals](../CTF_FUNDAMENTALS.md) + [Getting started](../GETTING_STARTED.md). Create a [CyLab Security Academy](https://cylabacademy.org/) account. | 45 min |
| 2 | [Linux essentials](../tools/LINUX-ESSENTIALS.md) §1–3. [Bandit](https://overthewire.org/wargames/bandit/) levels 0–4. | 60 min |
| 3 | Linux essentials §4–5 (grep, find, pipes). Bandit levels 5–9. | 60 min |
| 4 | Linux essentials §6–8. Bandit levels 10–13. | 60 min |
| 5 | Solve 3 **General Skills** challenges in the [CyLab library](https://learn.cylabacademy.org/library). | 60 min |

- **Learning materials:** [Linux essentials](../tools/LINUX-ESSENTIALS.md), [The Missing Semester (MIT)](https://missing.csail.mit.edu/) lecture 1 *The Shell*, [explainshell](https://explainshell.com/).
- **Practice links:** [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) (no account), [CyLab library](https://learn.cylabacademy.org/library) (free account).
- **Recommended tools:** a terminal (WSL on Windows), `file`, `strings`, `xxd`, `grep`, `find`, Python installed ([guide](../tools/INSTALLABLE-TOOLS.md#python)).
- **Measurable objectives:**
  - Minimum: Bandit level 10 · 2 CyLab challenges solved.
  - Stretch: Bandit level 15 · 5 CyLab challenges solved.
- **✅ By the end of the week you can:** navigate directories, find hidden files, search with `grep`/`find`, chain commands with pipes, and identify a file's type with `file`.

---

## Week 2: Explore beginner categories

**Focus:** OSINT, cryptography, steganography, digital forensics.

| Session | Do | Time |
|---|---|---|
| 1 | [01 · OSINT](../categories/01-OSINT.md): read §A–D, do exercises 1–3. | 60 min |
| 2 | [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md): read §A–D, do exercises 1–4. | 75 min |
| 3 | [CryptoHack](https://cryptohack.org/courses/) *Introduction to CryptoHack* course (first challenges). | 60 min |
| 4 | [03 · Steganography](../categories/03-STEGANOGRAPHY.md): read, do exercises 1–3. Try 1 CyLab Forensics stego-style challenge. | 60 min |
| 5 | [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md): read, do exercises 1–3 (incl. opening a real PCAP in Wireshark). | 75 min |

- **Learning materials:** the four category guides above; [Bellingcat toolkit](https://bellingcat.gitbook.io/toolkit); [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) chapters on display filters.
- **Practice links:** [CyLab library](https://learn.cylabacademy.org/library) (Cryptography, Forensics), [CryptoHack](https://cryptohack.org/) (free account), [OverTheWire Krypton](https://overthewire.org/wargames/krypton/) (no account), [TryHackMe OhSINT](https://tryhackme.com/room/ohsint) (account).
- **Recommended tools:** [CyberChef](https://gchq.github.io/CyberChef/), [dCode](https://www.dcode.fr/), [ExifTool](https://exiftool.org/), [Aperi'Solve](https://www.aperisolve.com/), [Wireshark](https://www.wireshark.org/).
- **Measurable objectives:**
  - Minimum: 1 solved challenge in **each** of the four categories.
  - Stretch: 8 challenges total · CryptoHack Introduction course complete.
- **✅ By the end of the week you can:** distinguish encoding, encryption and hashing; break Caesar/XOR with a known key; extract metadata; find appended data in images; filter HTTP traffic in Wireshark.

---

## Week 3: Explore technical categories

**Focus:** web security, networking basics, reverse-engineering introduction, programming fundamentals.

| Session | Do | Time |
|---|---|---|
| 1 | [05 · Web exploitation](../categories/05-WEB-EXPLOITATION.md) §A–D. [MDN: Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview). Web exercise 1. | 60 min |
| 2 | Create a free [PortSwigger](https://portswigger.net/web-security) account. Complete 2 Apprentice labs (e.g. SQL injection, access control). | 75 min |
| 3 | Networking basics: [04 · Forensics "Network traffic in one minute"](../categories/04-DIGITAL-FORENSICS.md#network-traffic-in-one-minute) + [OverTheWire Natas](https://overthewire.org/wargames/natas/) levels 0–5 (HTTP, headers, cookies). | 60 min |
| 4 | [06 · Reverse engineering](../categories/06-REVERSE-ENGINEERING.md) §A–D. Exercises 1–2 (compile your own program, invert a check). Install [Ghidra](../tools/INSTALLABLE-TOOLS.md#ghidra). | 75 min |
| 5 | Programming fundamentals: [Python tutorial](https://docs.python.org/3/tutorial/) chapters 3–5. Re-solve one earlier challenge **with a script** (e.g. Caesar brute force, nested Base64). | 60 min |

- **Learning materials:** [PortSwigger learning paths](https://portswigger.net/web-security/learning-paths), [MDN Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development), [Compiler Explorer](https://godbolt.org/), [Python tutorial](https://docs.python.org/3/tutorial/), [CS50x](https://cs50.harvard.edu/x/) (C, optional).
- **Practice links:** [PortSwigger labs](https://portswigger.net/web-security/all-labs) (free account), [Natas](https://overthewire.org/wargames/natas/) (no account), [CyLab library](https://learn.cylabacademy.org/library) (Web Exploitation, Reverse Engineering), optionally [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) locally.
- **Recommended tools:** Browser DevTools, [Burp Suite Community](https://portswigger.net/burp/communitydownload) or [ZAP](https://www.zaproxy.org/), `curl`, [Ghidra](https://github.com/NationalSecurityAgency/ghidra), Python.
- **Measurable objectives:**
  - Minimum: 2 PortSwigger labs · Natas level 3 · 1 RE challenge solved.
  - Stretch: 5 PortSwigger labs · Natas level 8 · 2 RE challenges · 1 challenge solved with your own script.
- **✅ By the end of the week you can:** explain HTTP requests/responses and cookies; describe SQL injection, XSS and broken access control *and their fixes*; find `main` in Ghidra and read decompiled code; write a 10-line Python script that loops and decodes.

> [!CAUTION]
> Web techniques this week are for PortSwigger labs, Natas, CyLab challenges and your local Juice Shop **only**. Never test real websites without written permission.

---

## Week 4: Apply your knowledge

**Focus:** solve beginner CTF challenges, read writeups, join a team, compete.

| Session | Do | Time |
|---|---|---|
| 1 | Find a team: your university's cyber security club, classmates from this workshop, or a beginner-friendly Discord community. Agree on a shared notes doc. | 45 min |
| 2 | Pick an upcoming beginner-friendly event on [CTFtime](https://ctftime.org/event/list/upcoming) (look for "beginner", "high school" or "university" events, or low-weight events). Read its rules. | 30 min |
| 3 | Warm-up: each teammate solves 2 challenges from a **past** competition (many have archives; search CTFtime). Read writeups for anything unsolved ([guide](../resources/WRITEUPS-AND-LEARNING.md)). | 75 min |
| 4–5 | **Compete!** Split categories by interest; share findings in your notes doc. If no event fits this week, run a 3-hour "mock CTF" from the CyLab library with a timer. | 2–4 h |
| Wrap-up | Write a short writeup for one challenge you solved (what you tried, what worked, what you learned). | 45 min |

- **Learning materials:** [CTF fundamentals → competing](../CTF_FUNDAMENTALS.md#competing-for-the-first-time), [Writeups and learning](../resources/WRITEUPS-AND-LEARNING.md), [Cheat sheets](../resources/CHEAT-SHEETS.md).
- **Practice links:** [CTFtime upcoming events](https://ctftime.org/event/list/upcoming), [CTFtime writeups](https://ctftime.org/writeups), [CyLab library](https://learn.cylabacademy.org/library).
- **Recommended tools:** everything from weeks 1–3, plus a shared notes doc and a team chat.
- **Measurable objectives:**
  - Minimum: join a team · participate in 1 CTF (or mock CTF) · solve 1 challenge in competition · read 3 writeups.
  - Stretch: solve 3+ challenges in competition · publish (or share with your club) 1 writeup.
- **✅ By the end of the week you can:** register and play in a CTF, collaborate with a team, learn from writeups, and document your own solution.

---

## After 30 days

- Go deeper in your favourite category using its guide's section **H. What to learn next**.
- Compete roughly once a month; CTFtime lists events almost every weekend.
- Revisit [practice platforms](PRACTICE-PLATFORMS.md) for structured paths: CryptoHack (crypto), PortSwigger (web), pwn.college (binary), CyberDefenders (blue team).
- Teach someone else: run a mini-session at your club. Explaining is the best way to learn.

[← 7-day roadmap](7-DAY-ROADMAP.md) &nbsp;|&nbsp; [Practice platforms →](PRACTICE-PLATFORMS.md)
