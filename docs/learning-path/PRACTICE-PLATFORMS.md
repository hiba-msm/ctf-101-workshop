# Practice Platforms

[Home](../../README.md) › **Practice platforms** &nbsp;·&nbsp; Presentation: slide 33 &nbsp;·&nbsp; See also: [7-day roadmap](7-DAY-ROADMAP.md) · [30-day roadmap](30-DAY-ROADMAP.md)

Where to practise legally, safely and (mostly) for free. All platforms below are **authorised training environments**: you're explicitly allowed to attack their challenges.

> Platform details (names, pricing, account rules) were checked in **November 2026**. Platforms change; if something differs, the platform's own site is authoritative. Please [open an issue](../../CONTRIBUTING.md) so we can update this page.

---

## Comparison

| Platform | Teaches | Cost | Account? | Categories | Start here |
|---|---|---|---|---|---|
| [CyLab Security Academy](#cylab-security-academy-formerly-picoctf) | Broad CTF skills | Free | Yes (free) | General skills, crypto, forensics, web, RE, binary | [Challenge library](https://learn.cylabacademy.org/library) |
| [OverTheWire](#overthewire) | Linux, web, crypto, RE, pwn via wargames | Free | No | Linux, Web, Crypto, RE, Pwn | [Bandit](https://overthewire.org/wargames/bandit/) |
| [TryHackMe](#tryhackme) | Guided rooms and learning paths | Freemium | Yes | All, plus blue team | [Free rooms](https://tryhackme.com/free-rooms) |
| [Root-Me](#root-me) | Large challenge collection | Free | Yes, to submit | 11 categories incl. web, crypto, stego, forensics, cracking | [Challenges](https://www.root-me.org/en/Challenges/) |
| [CryptoHack](#cryptohack) | Modern cryptography | Free | Yes (free) | Crypto | [Courses](https://cryptohack.org/courses/) |
| [PortSwigger Web Security Academy](#portswigger-web-security-academy) | Web security | Free | Yes, for labs | Web | [Learning paths](https://portswigger.net/web-security/learning-paths) |
| [OWASP Juice Shop](#owasp-juice-shop) | Web security on a local vulnerable app | Free, open source | No | Web | [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/) |
| [CTFtime](#ctftime) | Finding competitions, teams and writeups | Free | Optional | All | [Upcoming events](https://ctftime.org/event/list/upcoming) |

---

## CyLab Security Academy (formerly picoCTF)

- **Links:** <https://cylabacademy.org/> · [Challenge library](https://learn.cylabacademy.org/library) · [CTF Primer](https://primer.picoctf.org/)
- **What it teaches:** beginner-to-intermediate CTF skills through 500+ hands-on challenges (many with hints), from Carnegie Mellon University's security experts.
- **Name change:** on **8 May 2026** picoCTF became **CyLab Security Academy**; picoctf.org now redirects there. Existing picoCTF accounts and progress carry over. The former "picoGym" practice area is now the **Challenge Library**.
- **Cost:** free ("always free, for everyone" according to its homepage).
- **Account:** required (email verification). Users aged 13–17 need a parent or guardian's consent.
- **Categories:** General Skills, Cryptography, Forensics, Web Exploitation, Reverse Engineering, Binary Exploitation.
- **Ideal starting point:** the easiest General Skills challenges in the library, alongside the [CTF Primer](https://primer.picoctf.org/) for background reading.
- **Why it's first on the list:** it was designed for complete beginners, it's free, and many challenges include hints.

## OverTheWire

- **Links:** <https://overthewire.org/wargames/>
- **What it teaches:** "wargames": you SSH into a server and each level's password is the reward for solving the previous one.
- **Cost:** free. **Account:** not needed.
- **Categories and the site's suggested order:**
  - [Bandit](https://overthewire.org/wargames/bandit/): Unix/Linux basics. **Start here.**
  - Then pick one: [Natas](https://overthewire.org/wargames/natas/) (web security), [Krypton](https://overthewire.org/wargames/krypton/) (cryptography), [Leviathan](https://overthewire.org/wargames/leviathan/) (reverse engineering).
  - Later: [Narnia](https://overthewire.org/wargames/narnia/) and others (binary exploitation).
- **Ideal starting point:** [Bandit level 0](https://overthewire.org/wargames/bandit/bandit0.html).
- **Tip:** the site's rules ask players not to spoil the game for others. Struggle a little before searching for answers.

## TryHackMe

- **Links:** <https://tryhackme.com/> · [Free rooms](https://tryhackme.com/free-rooms) · [Pricing](https://tryhackme.com/pricing)
- **What it teaches:** guided, browser-based "rooms" and learning paths covering offensive security, defensive security (SOC, forensics) and CTF skills. Many rooms include in-browser virtual machines.
- **Cost:** **freemium.** A free account includes a large set of free rooms (TryHackMe's free-rooms page lists 650+) and limited in-browser machine time. Paid subscriptions unlock premium rooms and full learning paths; in 2026 TryHackMe split its paid offer into **Premium** and a higher **MAX** tier. Check the [pricing page](https://tryhackme.com/pricing) for current details.
- **Account:** required.
- **Categories:** all CTF categories plus networking, cloud and blue-team topics.
- **Ideal starting point:** filter the [free rooms](https://tryhackme.com/free-rooms) for beginner level. Specific rooms referenced in this repository: [OhSINT](https://tryhackme.com/room/ohsint) (OSINT), [Wireshark: The Basics](https://tryhackme.com/room/wiresharkthebasics) (forensics). Check each room's free/premium label.

## Root-Me

- **Links:** <https://www.root-me.org/> · [Challenges](https://www.root-me.org/en/Challenges/)
- **What it teaches:** a very large collection of challenges, run by a non-profit community, organised into 11 categories: App-Script, App-System, Cracking, Cryptanalysis, Forensic, Network, Programming, Realist, Steganography, Web-Client and Web-Server.
- **Cost:** free.
- **Account:** needed to submit flags and track progress.
- **Categories:** every CTF category.
- **Ideal starting point:** the lowest-point challenges in **Web-Server**, **Cryptanalysis** or **Steganography**.
- **Note:** the site is available in English and French; some community content is French-only.

## CryptoHack

- **Links:** <https://cryptohack.org/> · [Courses](https://cryptohack.org/courses/)
- **What it teaches:** modern cryptography (XOR, modular arithmetic, AES, RSA, elliptic curves, hash functions) through challenges you solve with Python.
- **Cost:** free. **Account:** required (free).
- **Categories:** Cryptography.
- **Ideal starting point:** the **Introduction to CryptoHack** course, then **Modular Arithmetic**.

## PortSwigger Web Security Academy

- **Links:** <https://portswigger.net/web-security> · [Learning paths](https://portswigger.net/web-security/learning-paths) · [All labs](https://portswigger.net/web-security/all-labs)
- **What it teaches:** web security from the makers of Burp Suite: clear written explanations plus hundreds of hosted, deliberately vulnerable labs, graded Apprentice → Practitioner → Expert.
- **Cost:** free.
- **Account:** free account required to access labs (reading the material doesn't need one).
- **Categories:** Web.
- **Ideal starting point:** the learning paths, starting with SQL injection or access control Apprentice labs.

## OWASP Juice Shop

- **Links:** [Project page](https://owasp.org/www-project-juice-shop/) · [GitHub](https://github.com/juice-shop/juice-shop) · [Pwning OWASP Juice Shop (guide)](https://pwning.owasp-juice.shop/)
- **What it teaches:** a deliberately insecure online shop with 100+ challenges covering the OWASP Top 10 and beyond, and its own Score Board to track progress.
- **Cost:** free, open source. **Account:** none (it runs on your computer).
- **Categories:** Web.
- **How to run:** with Docker: `docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop`, then open <http://localhost:3000>. Full setup in [05 · Web exploitation](../categories/05-WEB-EXPLOITATION.md#owasp-juice-shop). A public demo instance is linked from the project, but it's shared and may be unavailable.
- **Ideal starting point:** find the hidden Score Board ([hint page](https://pwning.owasp-juice.shop/companion-guide/latest/part2/score-board.html)).

## CTFtime

- **Links:** <https://ctftime.org/> · [Upcoming events](https://ctftime.org/event/list/upcoming) · [Writeups](https://ctftime.org/writeups)
- **What it teaches:** it's not a challenge platform but the **central calendar and ranking site** for CTF competitions worldwide, plus an archive of community writeups.
- **Cost:** free.
- **Account:** optional. Needed to create or join a team on CTFtime; registering for each competition happens on that competition's own site.
- **Categories:** all.
- **Ideal starting point:** browse upcoming events; look for ones described as beginner-friendly or aimed at students. Event "weight" on CTFtime reflects difficulty and prestige, and lower-weight events are often friendlier.

---

## More good places

| Platform | What | Cost / account |
|---|---|---|
| [pwn.college](https://pwn.college/) | Arizona State University's free dojos: Linux, RE, binary exploitation | Free · account |
| [CyberDefenders](https://cyberdefenders.org/) | Blue-team investigations (PCAPs, disk, memory) | Free and paid labs · account |
| [crackmes.one](https://crackmes.one/) | Community reverse-engineering challenges | Free · account to submit |
| [Hacker101](https://www.hacker101.com/) | Web-security videos and a CTF from HackerOne | Free · account |
| [Advent of Code](https://adventofcode.com/) | Programming puzzles (great for Misc) | Free · account to submit |

[← 30-day roadmap](30-DAY-ROADMAP.md) &nbsp;|&nbsp; [Home →](../../README.md)
