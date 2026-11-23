# CTF Fundamentals

[Home](../README.md) › **CTF fundamentals** &nbsp;·&nbsp; Presentation: slides 5–9 &nbsp;·&nbsp; Next: [Categories overview →](CATEGORIES_OVERVIEW.md)

Everything you need to understand what a CTF is, how competitions work and how to take part responsibly.

---

## Contents

- [What is a CTF?](#what-is-a-ctf)
- [Anatomy of a flag](#anatomy-of-a-flag)
- [How a CTF works, step by step](#how-a-ctf-works-step-by-step)
- [Types of CTF](#types-of-ctf)
- [Scoring](#scoring)
- [Practice platforms vs competitions](#practice-platforms-vs-competitions)
- [Teams](#teams)
- [Competing for the first time](#competing-for-the-first-time)
- [Hackers, hats and teams](#hackers-hats-and-teams)
- [The golden rule: permission](#the-golden-rule-permission)
- [CTF etiquette](#ctf-etiquette)

---

## What is a CTF?

**Capture The Flag (CTF)** is a cybersecurity competition that works like a treasure hunt. Each **challenge** hides a secret piece of text, the **flag**, inside a file, a website, network traffic, a program or an encrypted message. Find the flag, submit it, earn points.

| Term | Meaning |
|---|---|
| **Challenge** | A puzzle with a hidden secret inside |
| **Flag** | The secret text that proves you solved it |
| **Category** | The type of puzzle: crypto, web, forensics… ([overview](CATEGORIES_OVERVIEW.md)) |
| **Points** | Harder challenges are worth more; most points wins |
| **Submit** | Paste the flag into the competition website to score |
| **Writeup** | An explanation of how a challenge was solved, published after the event |

CTFs exist because the best way to learn security is hands-on, but practising on real systems without permission is illegal. CTFs give you **deliberately vulnerable targets you're allowed to attack**.

## Anatomy of a flag

```
FLAG{you_found_the_secret}
└┬─┘└──────────┬─────────┘
prefix    secret text, wrapped in { }
```

- Every competition chooses its own **prefix**: e.g. `picoCTF{…}` on the former picoCTF, `HTB{…}` on Hack The Box. The rules page always tells you the format.
- Flags are designed to be unguessable, so finding one proves you solved the challenge.
- Submit **exactly** what you found: case, underscores and braces matter.

## How a CTF works, step by step

1. **Join:** register yourself or a team on the CTF website.
2. **Browse:** see the board of challenges by category and points.
3. **Choose:** pick one that matches your interest or level.
4. **Investigate:** download the file or open the website it gives you.
5. **Spot clues:** anything odd? The title, file names, formats, hints. *Most of the work is noticing details, not typing commands.*
6. **Tools + logic:** test ideas one at a time with the right tool.
7. **Find it:** spot text in the agreed flag format.
8. **Submit:** paste it in, earn points, climb the scoreboard. Then repeat.

A typical online competition runs **24–48 hours**, solo or in teams. Practice platforms have no timer at all.

## Types of CTF

| Format | How it works | For beginners? |
|---|---|---|
| **Jeopardy** ★ | A board of independent challenges sorted by category and points (named after the TV quiz show's board). Solve them in any order. | **Start here.** Easy challenges always exist, and one stuck challenge never blocks you. |
| **Attack–Defense** | Every team gets identical vulnerable servers. Patch yours while attacking the others' to steal their flags. Example: the DEF CON CTF finals. | Later. Fast and intense; usually for experienced teams. |
| **King of the Hill** | Teams race to take control of a machine and hold it; the longer your name stays "on the throne", the more you score. Some training platforms offer this mode. | Fun once you have the basics. |

Everything in this workshop and repository is **Jeopardy-style**.

## Scoring

- **Static scoring:** each challenge has a fixed value.
- **Dynamic scoring:** a challenge's value drops as more teams solve it, so hard (rarely solved) challenges stay valuable.
- **Tie-breaks:** usually whoever reached the score first.
- **First blood:** being the first to solve a challenge, sometimes with bonus points or bragging rights.

## Practice platforms vs competitions

| | Practice platforms | Competitions |
|---|---|---|
| Timing | Any time, no deadline | Fixed window (often a weekend) |
| Hints and writeups | Often available | Not until after it ends |
| Pressure | None | Some, which is part of the fun |
| Where | [Practice platforms](learning-path/PRACTICE-PLATFORMS.md) | [CTFtime calendar](https://ctftime.org/event/list/upcoming) |

Start with practice platforms; enter your first competition after a few weeks (see the [30-day roadmap](learning-path/30-DAY-ROADMAP.md)).

## Teams

Most competitions allow teams (often 2–6 people, check the rules).

- **Mix interests:** one person who likes web, one crypto, one forensics covers more of the board.
- **Share a notes document:** one section per challenge: what was tried, what's left.
- **Communicate:** say what you're working on to avoid duplicating effort, and ask for a second pair of eyes when stuck.
- **Where to find a team:** your university's cyber security club, classmates from this workshop, or teams listed on [CTFtime](https://ctftime.org/).

## Competing for the first time

**Before:**
- Read the **rules**: flag format, team size, what's forbidden (sharing flags, attacking the scoreboard, automated scanning).
- Join the event's chat (often Discord) for announcements and hints.
- Prepare: browser tools bookmarked ([toolkit](tools/BROWSER-BASED-TOOLS.md)), Python installed, a notes doc.

**During:**
- Sort challenges by **number of solves**. The most-solved ones are usually the easiest.
- Time-box: 30–45 minutes on one challenge, then switch.
- Take breaks, eat, sleep. Fresh eyes solve challenges.
- Celebrate every flag. Your first is the hardest.

**After:**
- Read writeups for challenges you didn't solve ([how](resources/WRITEUPS-AND-LEARNING.md)).
- Write up one challenge you did solve.

## Hackers, hats and teams

Matches slide 9 of the presentation. People use similar skills but differ in **permission**, **intent** and **goal**.

| Term | Who |
|---|---|
| **White hat** | Authorised security professionals who protect systems: audits, ethical hacking, responsible disclosure |
| **Grey hat** | May look for weaknesses without clear authorisation. Good intentions don't make it legal. |
| **Black hat** | Breaks into systems for theft, disruption or personal gain. Illegal and harmful. |
| **Red team** | Authorised attackers who test whether defences work (penetration testing, adversary simulation) |
| **Blue team** | Defenders who monitor, detect and respond to attacks |
| **Purple team** | Red and blue sharing findings to improve defences together |

"Hat" describes intent and authorisation; "team" describes a role in a security exercise.

## The golden rule: permission

> [!IMPORTANT]
> **Only hack what you own or have explicit permission to test.** CTF challenges and training platforms give you that permission, within their rules. Your university network, a website you use, a friend's phone or a smart device on campus do **not**, no matter how curious you are or how good your intentions.

Unauthorised access is a crime in most countries, for example under the UK [Computer Misuse Act 1990](https://www.legislation.gov.uk/ukpga/1990/18/contents) and the US [Computer Fraud and Abuse Act](https://www.justice.gov/jm/jm-9-48000-computer-fraud). If you find a vulnerability by accident in a real system, stop, don't explore further, and report it through the organisation's official channel (many publish one at `/.well-known/security.txt`, see [securitytxt.org](https://securitytxt.org/)).

More: [README: Ethics and responsible use](../README.md#ethics-and-responsible-use).

## CTF etiquette

- Don't share flags or solutions during a live competition.
- Don't attack the CTF infrastructure (scoreboard, other teams' machines) unless the format explicitly includes it, as in Attack–Defense.
- Don't brute-force flag submission or run heavy scanners when the rules forbid it.
- Be kind in chats; everyone was a beginner once.
- Publish writeups only after the event ends.

---

[← Getting started](GETTING_STARTED.md) &nbsp;|&nbsp; [Categories overview →](CATEGORIES_OVERVIEW.md)
