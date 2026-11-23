# CTF 101: Your First Steps Into Cybersecurity

[![License: MIT](https://img.shields.io/badge/license-MIT-36e2ea.svg)](LICENSE)

A complete, beginner-friendly **Capture The Flag (CTF) workshop** for university students with no security background: a 36-slide interactive HTML presentation (about 45–60 minutes, with two live audience challenges) plus in-depth guides, toolkits and learning roadmaps to keep learning afterwards.

> **New here?** Start with [Getting started](docs/GETTING_STARTED.md): your first flag in 30 minutes, no installation needed.

---

## Table of contents

- [What you'll learn](#what-youll-learn)
- [The presentation](#the-presentation)
  - [Viewing it](#viewing-it)
  - [Running it locally](#running-it-locally)
  - [Presenting](#presenting)
- [Repository navigation](#repository-navigation)
- [Category guides](#category-guides)
- [Toolkits](#toolkits)
- [Learning roadmaps](#learning-roadmaps)
- [Practice platforms](#practice-platforms)
- [Ethics and responsible use](#ethics-and-responsible-use)
- [Contributing](#contributing)
- [Credits and sources](#credits-and-sources)
- [License](#license)

---

## What you'll learn

- What CTF competitions are, how they work and how to take part ([fundamentals](docs/CTF_FUNDAMENTALS.md)).
- The **eight classic categories**: OSINT, cryptography, steganography, digital forensics, web exploitation, reverse engineering, binary exploitation and miscellaneous. Covers what each is, what the challenges look like and how to approach them.
- Which **tools** to use and when, starting with browser-based tools that need no installation.
- A step-by-step **method** that works for any challenge.
- **Where to practise** legally and for free, and a realistic plan for your first 7 and 30 days.
- The **ethics**: why permission is everything.

---

## The presentation

### Viewing it

The presentation is a single static web page ([index.html](index.html)) with no build step or backend: plain HTML, CSS and vanilla JavaScript.

- **From a copy of this repository:** open `index.html` in a browser (see below).
- **Hosted link for participants:** the deck isn't hosted publicly yet. See [Participant access](#participant-access-during-the-workshop) for the options.

Slides link to the matching guide in `docs/`. When the deck is opened from your own computer, the links open the local Markdown files. When it's served from a website, they open the rendered guides on GitHub (configured in `<body data-docs-base="…">` in `index.html`).

### Running it locally

**Option A: just open it.** Double-click `index.html`. Everything works from the file system.

**Option B: local server** (handy for presenting from another machine on the network):

```bash
cd ctf-101-workshop
python -m http.server 8000
# then open http://localhost:8000
```

| External dependency | Why | Offline behaviour |
|---|---|---|
| Google Fonts (Montserrat, Inter, JetBrains Mono) | Typography | Falls back to Segoe UI / system fonts and Consolas. Layout still works. |
| Outbound links (CyberChef, CyLab Security Academy, etc.) | Clickable resources | Only needed when you click them. |

Everything else (icons, illustrations, QR code) is local inline SVG or in `assets/`.

### Presenting

| Key | Action |
|---|---|
| `→` `↓` `Space` `PageDown` | Next slide (works with most presentation clickers) |
| `←` `↑` `Shift+Space` `PageUp` | Previous slide |
| `Home` / `End` | First / last slide |
| `O` or `G` | Slide overview grid (arrow keys + `Enter` to jump, `Esc` to close) |
| `N` | Speaker notes drawer (timings, talking points, answers) |
| `F` | Fullscreen |
| `?` or `H` | Shortcut help |

- The control bar and footer hide after about 3 seconds without mouse movement.
- The URL hash tracks the slide (`index.html#14`), so you can bookmark or reload in place.
- On the category map (slide 10), each card jumps to its category. Each category's second slide has a **Full guide** button.
- Swipe left/right works on touch screens.

**Personalise before you present:** on slide 1, click **"Your University · Cyber Security Club"** and **"Your Name"** and type your own; on slide 35, click the contact line. Text is remembered in that browser (`localStorage`). To make it permanent for everyone, edit the same text in `index.html`.

**Speaker notes and a projector:** the notes drawer (`N`) sits on top of the slide. If your projector mirrors your screen, open notes only when needed, or keep a second copy of the deck open on another device.

**Interactive moments** (none need the audience to install anything):

| Slide | Interaction |
|---|---|
| 14 · Cryptography | Live Caesar/ROT13 slider: drag to 13 to reveal the flag |
| 15 · Steganography | Pixel grid hiding "FLAG" in the least significant bits |
| 20 · Web | Mock student portal: "Open DevTools" reveals an HTML comment and a cookie |
| 23 · Binary exploitation | Type a long name to watch a buffer overflow into the return address |
| 26 · Misc | Morse code and ASCII mini-quizzes |
| 31 · Challenge 1 | Decode a Base64 message: clues, live decode, pre-filled CyberChef link |
| 32 · Challenge 2 | "Spot the clue" vote with per-option explanations |

<details>
<summary><b>Editing the slides</b></summary>

Slides are authored on a fixed 1600×900 canvas and scaled to fit any screen.

- **Add a slide:** copy a `<section class="slide" data-title="…" data-section="…">` block. Counter, progress bar and overview update automatically.
- **Category colour:** set `style="--accent:var(--c-web)"` (or any colour) on the section.
- **Staggered entrance:** add `class="rise"` and `style="--i:N"` to elements.
- **Reveal button:** `<button data-reveal="#panel-id">` toggles an element with `class="reveal"`.
- **Link to a guide:** `<a data-doc href="docs/…md">`. The `data-doc` attribute enables the GitHub rewrite described above.
- **If you add slides before slide 25**, update the `data-goto` numbers on the category map (slide 10) and the slide numbers mentioned in `docs/`.

**Regenerating the QR code** (slide 35 points to <https://cylabacademy.org/>):

```bash
pip install qrcode
python -c "import qrcode, qrcode.image.svg as s; qrcode.make('https://your-link', image_factory=s.SvgPathImage, border=2).save('assets/qr-cylab.svg')"
```

</details>

---

## Repository navigation

```text
ctf-101-workshop/
├── index.html                 the 36-slide presentation (+ speaker notes)
├── css/style.css              design tokens, layout, components
├── js/deck.js                 navigation, overview, notes, interactive widgets
├── assets/qr-cylab.svg        QR code → https://cylabacademy.org/
├── docs/
│   ├── GETTING_STARTED.md     start here after the workshop
│   ├── CTF_FUNDAMENTALS.md    formats, scoring, teams, rules, ethics
│   ├── CATEGORIES_OVERVIEW.md the 8 categories side by side
│   ├── categories/            one in-depth guide per category (01–08)
│   ├── tools/                 browser toolkit, installable toolkit, Linux essentials
│   ├── learning-path/         7-day and 30-day roadmaps, practice platforms
│   ├── glossary/              cybersecurity jargon explained
│   └── resources/             cheat sheets, writeups, further reading
├── CONTRIBUTING.md
└── LICENSE
```

---

## Category guides

Each guide goes well beyond the slides and follows the same structure: **introduction · prerequisites · understanding the challenges · step-by-step methodology · tools (with official links) · learning resources · practice exercises with solutions · what to learn next**.

| # | Guide | Covers | Slides |
|---|---|---|---|
| 01 | [OSINT](docs/categories/01-OSINT.md) | Search operators, reverse image search, geolocation, metadata, WHOIS/RDAP, verification, privacy ethics | 11–12 |
| 02 | [Cryptography](docs/categories/02-CRYPTOGRAPHY.md) | Encoding vs encryption vs hashing, Caesar, substitution, Base64, XOR, frequency analysis, symmetric/asymmetric, password storage | 13–14 |
| 03 | [Steganography](docs/categories/03-STEGANOGRAPHY.md) | Metadata, file signatures, colour channels, LSB, appended data, audio spectrograms | 15–16 |
| 04 | [Digital forensics](docs/categories/04-DIGITAL-FORENSICS.md) | File signatures, logs, PCAP analysis, disk and memory forensics, file carving, evidence integrity | 17–18 |
| 05 | [Web exploitation](docs/categories/05-WEB-EXPLOITATION.md) | HTTP, cookies and sessions, authN vs authZ, SQLi, XSS, path traversal, access control, OWASP Top 10:2025 | 19–20 |
| 06 | [Reverse engineering](docs/categories/06-REVERSE-ENGINEERING.md) | Compiled programs, static vs dynamic analysis, strings, assembly basics, control flow, executable formats | 21–22 |
| 07 | [Binary exploitation](docs/categories/07-BINARY-EXPLOITATION.md) | Memory layout, stack vs heap, buffer overflows (conceptually), segfaults, protections, debugging | 23–24 |
| 08 | [Miscellaneous](docs/categories/08-MISCELLANEOUS.md) | Programming challenges, esoteric encodings, audio, puzzles, multi-step challenges | 25–26 |

Not sure where to begin? See the [categories overview](docs/CATEGORIES_OVERVIEW.md).

---

## Toolkits

| Guide | What's inside |
|---|---|
| [Browser-based tools](docs/tools/BROWSER-BASED-TOOLS.md) | CyberChef, dCode, Aperi'Solve, StegOnline, Google Lens, DevTools, HexEd.it, regex101, with **privacy notes** for each |
| [Installable tools](docs/tools/INSTALLABLE-TOOLS.md) | Python, Git, ExifTool (essential) · Wireshark, Burp Suite Community, Ghidra (later) · GDB, Autopsy (advanced) |
| [Linux essentials](docs/tools/LINUX-ESSENTIALS.md) | The ~30 commands that carry you through most CTFs, with Windows equivalents |
| [Cheat sheets](docs/resources/CHEAT-SHEETS.md) | Encodings, file signatures, CyberChef recipes, Python snippets, Wireshark filters, GDB |

> [!WARNING]
> Never upload private, confidential or sensitive files to third-party analysis websites. Use online tools for CTF challenge files only.

---

## Learning roadmaps

| Roadmap | Time | Goal |
|---|---|---|
| [7-day roadmap](docs/learning-path/7-DAY-ROADMAP.md) | 45–60 min/day | Solve your first CTF challenges (matches slide 34) |
| [30-day roadmap](docs/learning-path/30-DAY-ROADMAP.md) | 4–6 h/week | Compete in a beginner CTF with a team |

---

## Practice platforms

Full comparison in [Practice platforms](docs/learning-path/PRACTICE-PLATFORMS.md) (details checked November 2026).

| Platform | Best for | Cost |
|---|---|---|
| [CyLab Security Academy](https://cylabacademy.org/) (formerly picoCTF) | First challenges in every category | Free (account) |
| [OverTheWire](https://overthewire.org/wargames/) | Linux (Bandit), then web, crypto, RE | Free (no account) |
| [TryHackMe](https://tryhackme.com/) | Guided rooms and paths | Freemium |
| [Root-Me](https://www.root-me.org/) | Large challenge collection | Free (account to submit) |
| [CryptoHack](https://cryptohack.org/) | Cryptography | Free (account) |
| [PortSwigger Web Security Academy](https://portswigger.net/web-security) | Web security | Free (account for labs) |
| [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) | Web security, run locally | Free, open source |
| [CTFtime](https://ctftime.org/) | Finding competitions and writeups | Free |

---

## Ethics and responsible use

This material teaches skills that can cause real harm if misused. By using it, you agree to these rules:

1. **Only test systems you own or have explicit, written permission to test**: CTF challenges, training platforms and local labs like OWASP Juice Shop. Your university network, websites you use, other people's devices and accounts are **off limits**.
2. **OSINT stays on challenge material and public information about organisations and places.** Never investigate, locate or expose real private individuals.
3. **No real-world attacks.** The web and binary-exploitation guides explain vulnerabilities *conceptually* and point to authorised labs. They aren't instructions for attacking real services.
4. **Found a real vulnerability by accident?** Stop, don't explore further, and report it through the organisation's official channel (look for `/.well-known/security.txt`).
5. **Respect competition rules:** no flag sharing during events, no attacking the infrastructure.

Unauthorised access is a criminal offence in most countries (e.g. the UK [Computer Misuse Act 1990](https://www.legislation.gov.uk/ukpga/1990/18/contents), the US [Computer Fraud and Abuse Act](https://www.justice.gov/jm/jm-9-48000-computer-fraud)). If in doubt, don't, and ask first. More in [CTF fundamentals: the golden rule](docs/CTF_FUNDAMENTALS.md#the-golden-rule-permission).

---

## Contributing

Corrections and improvements are welcome, especially broken links, outdated platform details and clearer explanations. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. In short: verify facts against official sources, keep it beginner-friendly, and keep everything legal and ethical.

### Participant access during the workshop

This repository is **private**. Participants can only open it if they're invited as collaborators (GitHub → *Settings → Collaborators → Add people*; see [GitHub's guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)). Each participant then needs a GitHub account. Making the presentation available through a single public link (e.g. GitHub Pages) would also make the content public, and that's a decision for the repository owner.

---

## Credits and sources

- **Visual direction:** inspired by the Canva template "Electric Blue and Black Modern Computer Security Presentation" (black canvas, neon-cyan glow titles, solid and outlined cards, pill labels). All illustrations are original SVG; icons are hand-drawn inline SVG.
- **Facts and links** were checked in November 2026 against official sources: each tool's own website and documentation, the platforms' own pages, [OWASP](https://owasp.org/Top10/2025/), [MDN](https://developer.mozilla.org/), and [Wikipedia's list of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures). The presentation's last slide lists its sources.
- **Example strings** (Base64, ciphertexts, hashes, LSB values) were generated and verified with Python. **All challenges are illustrative examples** written for this workshop and are labelled as such.
- **Notable changes found during research:**
  - picoCTF became **CyLab Security Academy** on 8 May 2026 (same Carnegie Mellon team; old accounts work).
  - ZoomEye moved to zoomeye.ai.
  - TryHackMe added a MAX tier in 2026.
  - `ctf101.org` returned HTTP 500 during the November 2026 link check and is still linked as a well-known handbook.
- Product names and logos mentioned belong to their respective owners; no endorsement is implied.

---

## License

Released under the [MIT License](LICENSE). You're free to reuse and adapt the presentation and guides for your own workshops; a credit is appreciated.
