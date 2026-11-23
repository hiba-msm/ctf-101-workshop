# 7-Day Beginner Roadmap

[Home](../../README.md) › **7-day roadmap** &nbsp;·&nbsp; Presentation: slide 34 &nbsp;·&nbsp; Next: [30-day roadmap →](30-DAY-ROADMAP.md)

**Goal:** go from "I just attended CTF 101" to **solving your first real CTF challenges**, in about **45–60 minutes a day**.

**Rules of the road:**
- Skipping or swapping a day is fine; consistency beats intensity.
- Keep a notes file (a text file, Notion, paper). Write down every command and idea that worked.
- Stuck for 20 minutes? Use the hint, read a writeup, or ask a friend. That's learning, not cheating (outside competitions).
- Everything this week is **free**. Two platforms need a free account: [CyLab Security Academy](https://cylabacademy.org/) and [PortSwigger Web Security Academy](https://portswigger.net/web-security).

---

## Overview

| Day | Theme | Main tool | Time | Milestone |
|---|---|---|---|---|
| 1 | Understand CTFs | Browser | 45 min | Account created, 1 challenge solved |
| 2 | Linux basics | SSH / terminal | 60 min | Bandit level 5 reached |
| 3 | OSINT or crypto | CyberChef, dCode | 45 min | 2 crypto/OSINT challenges solved |
| 4 | Inspect files | `file`, `strings`, ExifTool, Aperi'Solve | 60 min | 1 forensics challenge solved |
| 5 | First web challenge | Browser DevTools | 60 min | 1 PortSwigger lab + 1 web challenge |
| 6 | Explore | Your choice | 60 min | Category guide read, 2 challenges tried |
| 7 | Solve & read | Everything | 60 min | 3 challenges solved, 1 writeup read |

---

## Day 1: Understand CTFs

- **Learning objective:** know how a CTF works and where to practise.
- **Read:** [CTF fundamentals](../CTF_FUNDAMENTALS.md) (15 min) and [Getting started](../GETTING_STARTED.md).
- **Tool:** your browser.
- **Practice exercise:**
  1. Create a free account on [CyLab Security Academy](https://cylabacademy.org/) (formerly picoCTF; existing picoCTF accounts still work).
  2. Open the [challenge library](https://learn.cylabacademy.org/library), filter for the easiest **General Skills** challenges.
  3. Solve one. Many are about reading carefully or running one command.
- **Estimated time:** 45 minutes.
- **✅ Milestone:** you've submitted your first flag.

## Day 2: Linux basics

- **Learning objective:** navigate a Linux system and read files from the command line.
- **Read:** [Linux essentials](../tools/LINUX-ESSENTIALS.md) sections 1–4.
- **Tool:** a terminal with `ssh` (built into Windows 10/11, macOS and Linux).
- **Practice exercise:** play [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) levels **0 → 5**. Each level page lists the commands you might need. Use [explainshell](https://explainshell.com/) for any command you don't understand.
- **Estimated time:** 60 minutes.
- **✅ Milestone:** you can log into level 5 and know what `ls -la`, `cat`, `cd` and `find` do.

## Day 3: OSINT or cryptography

- **Learning objective:** recognise common encodings and break a classic cipher.
- **Read:** [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md) sections A and C, *or* [01 · OSINT](../categories/01-OSINT.md) sections A and D.
- **Tool:** [CyberChef](https://gchq.github.io/CyberChef/) and [dCode](https://www.dcode.fr/).
- **Practice exercise:** do [crypto exercises 1–2](../categories/02-CRYPTOGRAPHY.md#g-mini-practice-exercises) (or [OSINT exercises 1 and 3](../categories/01-OSINT.md#g-mini-practice-exercises)), then solve **two** Cryptography challenges in the CyLab library.
- **Estimated time:** 45 minutes.
- **✅ Milestone:** you can tell Base64, hex and binary apart at a glance.

## Day 4: Inspect files

- **Learning objective:** triage an unknown file like a forensic analyst.
- **Read:** [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md) section D, steps 1–3, and [03 · Steganography](../categories/03-STEGANOGRAPHY.md) section D.
- **Tools:** `file` and `strings` (WSL/Linux/macOS; Git Bash has `file`), [ExifTool](https://exiftool.org/), [Aperi'Solve](https://www.aperisolve.com/).
- **Practice exercise:** do [stego exercise 2](../categories/03-STEGANOGRAPHY.md#exercise-2-hide-and-seek-with-your-own-file) (hide and find data in your own image), then solve one Forensics challenge in the CyLab library.
- **Estimated time:** 60 minutes.
- **✅ Milestone:** you automatically run `file`, `exiftool` and `strings` on every new file.

## Day 5: First web challenge

- **Learning objective:** use DevTools to inspect what a website sends you.
- **Read:** [05 · Web exploitation](../categories/05-WEB-EXPLOITATION.md) sections A, D ("How websites work", "Cookies and sessions").
- **Tool:** Browser Developer Tools (`F12`).
- **Practice exercise:**
  1. Do [web exercise 1](../categories/05-WEB-EXPLOITATION.md#exercise-1-secrets-in-the-page-your-own-local-file).
  2. Create a free [PortSwigger](https://portswigger.net/web-security) account and complete one **Apprentice** lab.
  3. Try one Web Exploitation challenge in the CyLab library.
- **Estimated time:** 60 minutes.
- **✅ Milestone:** you can find comments, cookies and requests in DevTools, and you know to test only authorised targets.

## Day 6: Explore

- **Learning objective:** pick a favourite category and go deeper.
- **Read:** the full guide for the category that made you most curious this week (see [Categories overview](../CATEGORIES_OVERVIEW.md)).
- **Tool:** whichever that guide recommends first.
- **Practice exercise:** do that guide's section G exercises, then try **two** challenges in that category.
- **Estimated time:** 60 minutes.
- **✅ Milestone:** you can explain in two sentences what your chosen category is about.

## Day 7: Solve & read

- **Learning objective:** practise the full cycle: attempt, get stuck, learn from others.
- **Read:** [Writeups and learning](../resources/WRITEUPS-AND-LEARNING.md), "How to read a writeup".
- **Tool:** everything you've used this week.
- **Practice exercise:** solve **2–3** challenges of your choice. For one you **couldn't** solve, find a writeup, read it, then solve it yourself without looking.
- **Estimated time:** 60 minutes.
- **✅ Milestone:** you've solved at least 5 challenges this week and read your first writeup.

---

## What's next?

Continue with the [30-day roadmap](30-DAY-ROADMAP.md) (you can start at **Week 2**, since this week covered most of Week 1), browse [practice platforms](PRACTICE-PLATFORMS.md), and look for a beginner-friendly competition on [CTFtime](https://ctftime.org/event/list/upcoming).

[← Home](../../README.md) &nbsp;|&nbsp; [30-day roadmap →](30-DAY-ROADMAP.md)
