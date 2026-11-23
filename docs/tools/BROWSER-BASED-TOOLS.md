# Browser-Based Toolkit

[Home](../../README.md) › **Browser-based tools** &nbsp;·&nbsp; Presentation: slide 27 &nbsp;·&nbsp; See also: [Installable tools](INSTALLABLE-TOOLS.md) · [Linux essentials](LINUX-ESSENTIALS.md)

You can solve your first CTF challenges **without installing anything**. Every tool on this page runs in a web browser, so it works on a university lab PC, a Chromebook or a borrowed laptop.

---

## Contents

- [Before you start: privacy and safety](#before-you-start-privacy-and-safety)
- [Quick reference](#quick-reference)
- [CyberChef](#cyberchef) · [dCode](#dcode) · [Aperi'Solve](#aperisolve) · [StegOnline](#stegonline) · [Google Lens](#google-lens) · [Browser Developer Tools](#browser-developer-tools) · [HexEd.it](#hexedit-online-hex-editor) · [regex101](#regex101) · [More useful browser tools](#more-useful-browser-tools)

---

## Before you start: privacy and safety

> [!WARNING]
> **Never upload private, confidential or sensitive files to third-party analysis websites.** That includes your own photos (they may contain GPS location), coursework, work documents, anything belonging to someone else, and real malware. Some sites keep uploaded files, and some make them public. Use these tools for **CTF challenge files** and data you're happy to share.

Two kinds of browser tool:

| Runs **in your browser** (data stays on your computer) | Sends data **to a server** |
|---|---|
| CyberChef, StegOnline, HexEd.it, Browser DevTools | Aperi'Solve, dCode, Google Lens, Dogbolt, regex101 (when you save or share) |

Even for tools that run locally, the page itself still loads from the internet. For truly offline work, CyberChef can be downloaded and opened from disk.

---

## Quick reference

| Tool | What it does | Categories | Runs where |
|---|---|---|---|
| [CyberChef](https://gchq.github.io/CyberChef/) | Encode, decode, decrypt, transform data | Crypto, Forensics, Misc, Stego | Your browser |
| [dCode](https://www.dcode.fr/) | Identify and solve classic ciphers and codes | Crypto, Misc | Server |
| [Aperi'Solve](https://www.aperisolve.com/) | Runs many stego tools on an uploaded image | Stego, Forensics | Server |
| [StegOnline](https://georgeom.net/StegOnline/) | Bit planes and LSB extraction | Stego | Your browser |
| [Google Lens](https://search.google/ways-to-search/lens/) | Reverse image search | OSINT | Server |
| Browser DevTools (`F12`) | Inspect pages, requests, cookies | Web | Your browser |
| [HexEd.it](https://hexed.it/) | View and edit raw bytes | Forensics, Stego, RE | Your browser |
| [regex101](https://regex101.com/) | Build and test regular expressions | Forensics, Misc, Web | Your browser (saving stores it on their server) |

---

## CyberChef

- **Link:** <https://gchq.github.io/CyberChef/> · Docs: [CyberChef wiki](https://github.com/gchq/CyberChef/wiki)
- **What it does:** a drag-and-drop "kitchen" of 300+ operations (Base64, hex, XOR, AES, hashing, compression, QR codes…) that you chain into a **recipe**. Made by GCHQ, the UK intelligence agency, and open source.
- **Categories:** Cryptography, Forensics, Misc, Steganography, some Web.
- **When to use it:** you have a string or file that looks encoded and you don't want to write code. The [workshop's Challenge 1 link](https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true,false)&input=Umt4QlIzdGpkWEpwYjNOcGRIbGZhWE5mZVc5MWNsOXpkWEJsY25CdmQyVnlmUT09) opens it with a recipe already loaded.
- **Quick start:**
  1. Paste your data into **Input** (top right).
  2. Search for an operation on the left (e.g. "From Base64") and drag it into **Recipe**.
  3. Read **Output**. Add more operations to chain them.
  4. Stuck? Drag in **Magic**, which tries to detect encodings automatically.
- **Limitations:** very large files can slow the browser; it can't parse PCAP files or disk images.
- **Privacy:** processing happens in your browser.
- **Deeper guide:** [02 · Cryptography → CyberChef](../categories/02-CRYPTOGRAPHY.md#cyberchef).

## dCode

- **Link:** <https://www.dcode.fr/> · Start with the [Cipher Identifier](https://www.dcode.fr/cipher-identifier)
- **What it does:** hundreds of individual solvers for classic ciphers (Caesar, Vigenère, substitution), codes (Morse, Braille, pigpen) and puzzles, each with an explanation page.
- **Categories:** Cryptography, Misc.
- **When to use it:** "I have no idea what cipher this is", or you need a solver for a historical cipher.
- **Quick start:** paste the text into the Cipher Identifier → click the most likely result → use that tool's *Decrypt* button (many offer automatic brute force).
- **Limitations:** focused on classical ciphers, not modern crypto; ad-supported.
- **Privacy:** text is processed on dCode's servers.
- **Deeper guide:** [02 · Cryptography → dCode](../categories/02-CRYPTOGRAPHY.md#dcode).

## Aperi'Solve

- **Link:** <https://www.aperisolve.com/> · Docs: [GitHub README/wiki](https://github.com/Zeecka/AperiSolve)
- **What it does:** upload an image (or audio/PDF) and it shows every bit plane and runs many analysers (zsteg, steghide, binwalk, exiftool, foremost, strings and more) on one results page.
- **Categories:** Steganography, Forensics.
- **When to use it:** first pass on any image challenge, especially if you can't install Linux tools.
- **Quick start:** drag the image onto the page → wait for analysis → scroll through bit planes and each tool's output.
- **Limitations:** for password-protected steghide data you must supply the password; huge files may be rejected or slow.
- **Privacy:** **files are uploaded to its server**. Only upload challenge files.
- **Deeper guide:** [03 · Steganography → Aperi'Solve](../categories/03-STEGANOGRAPHY.md#aperisolve).

## StegOnline

- **Link:** <https://georgeom.net/StegOnline/> · Docs: [GitHub README](https://github.com/Ge0rg3/StegOnline)
- **What it does:** browser port of the classic StegSolve: browse 32 bit planes, extract LSB data with chosen channels and bit order, view colour palettes and PNG chunks.
- **Categories:** Steganography.
- **When to use it:** you suspect LSB/bit-plane hiding and want manual control.
- **Quick start:** *Upload Image* → *Browse Bit Planes* (step through R/G/B 0) → *Extract Files/Data* (tick bit 0 for R, G, B → *Go*).
- **Limitations:** images only; large images can slow the tab.
- **Privacy:** its README states no data is stored or transferred, and processing happens in your browser.
- **Deeper guide:** [03 · Steganography → StegOnline](../categories/03-STEGANOGRAPHY.md#stegonline).

## Google Lens

- **Link:** <https://search.google/ways-to-search/lens/>
- **What it does:** reverse image search: identifies landmarks, objects and text, and finds visually similar images online.
- **Categories:** OSINT.
- **When to use it:** "Where was this photo taken?" or "Where else does this image appear?"
- **Quick start:** in Chrome, right-click an image → *Search with Google Lens*. Drag the selection box to focus on one detail (a sign, a building) and search again.
- **Limitations:** results depend on what's indexed; less famous places may not match. Try alternatives like Bing Visual Search and Yandex Images.
- **Privacy:** images are sent to Google. Don't search photos of real private people.
- **Deeper guide:** [01 · OSINT → Google Lens](../categories/01-OSINT.md#google-lens).

## Browser Developer Tools

- **Link:** built into your browser: press `F12` (or `Ctrl+Shift+I`, `Cmd+Option+I` on Mac). Docs: [Chrome](https://developer.chrome.com/docs/devtools/overview) · [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/)
- **What it does:** shows the HTML, JavaScript, network requests, cookies and storage of any page, and lets you edit them live.
- **Categories:** Web (essential), sometimes Misc and Crypto (JavaScript-based puzzles).
- **When to use it:** every web challenge, first.
- **Quick start:**
  - **Elements/Inspector:** HTML, including comments and hidden fields.
  - **Console:** run JavaScript, e.g. `document.cookie`.
  - **Sources/Debugger:** read the site's JavaScript files.
  - **Network:** every request and response, with headers.
  - **Application/Storage:** cookies, localStorage, sessionStorage.
- **Limitations:** only shows the client side; server code stays hidden.
- **Privacy:** local to your browser.
- **Deeper guide:** [05 · Web exploitation → DevTools](../categories/05-WEB-EXPLOITATION.md#browser-developer-tools).

## HexEd.it (online hex editor)

- **Link:** <https://hexed.it/>
- **What it does:** opens any file as raw bytes (hex on the left, text on the right) and lets you edit and save it.
- **Categories:** Forensics, Steganography, Reverse engineering.
- **When to use it:** checking or repairing magic bytes, looking for data appended after the end of an image, reading binary structures.
- **Quick start:** *Open file* → look at the first bytes (file signature) and the last bytes → edit a byte by clicking it and typing → *Export*.
- **Limitations:** not designed for multi-gigabyte files.
- **Privacy:** HexEd.it states that all processing is done in your browser and no data is sent to its server.
- **Command-line alternative:** `xxd` (see [Linux essentials](LINUX-ESSENTIALS.md)).

## regex101

- **Link:** <https://regex101.com/>
- **What it does:** build and test **regular expressions** (search patterns) with a live explanation of each part.
- **Categories:** Forensics (searching logs), Misc, Web.
- **When to use it:** you want to extract all IP addresses or `FLAG{...}` patterns from a big text, and need to get the pattern right.
- **Quick start:** pick a flavour (Python, PCRE…), type a pattern like `FLAG\{[^}]+\}` and paste test text; matches are highlighted and explained on the right.
- **Limitations:** for testing patterns; use `grep -E` or Python's `re` to apply them to real files.
- **Privacy:** testing happens in the browser; if you click *Save*, your pattern and test text are stored on regex101's servers and get a shareable link. Don't paste sensitive logs.

## More useful browser tools

| Tool | What for | Notes |
|---|---|---|
| [explainshell](https://explainshell.com/) | Paste a shell command, see what each part does | Great for learning Linux commands |
| [ICANN Lookup](https://lookup.icann.org/) | Domain registration data (RDAP/WHOIS) | OSINT |
| [Compiler Explorer](https://godbolt.org/) | See C/C++ compiled to assembly | Learning reverse engineering |
| [Dogbolt](https://dogbolt.org/) | Compare decompilers on a small binary | Files must be under 2 MB, and the site states uploaded binaries are **retained** |
| [Try It Online](https://tio.run/) | Run code in hundreds of languages | Esoteric languages in Misc |
| [OSINT Framework](https://osintframework.com/) | Directory of OSINT resources | Links to third-party tools of varying quality and privacy |
| [Google Maps](https://www.google.com/maps) | Maps, satellite, Street View | OSINT geolocation |

---

[← Home](../../README.md) &nbsp;|&nbsp; [Installable tools →](INSTALLABLE-TOOLS.md)
