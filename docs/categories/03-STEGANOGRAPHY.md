# 03 · Steganography

[Home](../../README.md) › [Categories](../CATEGORIES_OVERVIEW.md) › **Steganography**
&nbsp;·&nbsp; Presentation: slides 15–16 (LSB pixel-grid demo) &nbsp;·&nbsp; [← 02 · Cryptography](02-CRYPTOGRAPHY.md) · [04 · Digital forensics →](04-DIGITAL-FORENSICS.md)

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

A meme circulates in your course group chat. It looks completely normal. But if you open it in the right tool, the faintest change in the colour values of a few hundred pixels spells out a message. To everyone else it's just a cat picture. That's steganography: the secret isn't scrambled, it's **invisible**.

### What it is

**Steganography** ("covered writing" in Greek) is the practice of **hiding the existence** of a message inside something innocent-looking: an image, an audio file, a document, even the whitespace in a text file.

### Steganography vs cryptography

| | Cryptography | Steganography |
|---|---|---|
| Goal | Make the message **unreadable** | Make the message **unnoticed** |
| An observer sees | Obvious gibberish ("there's a secret here") | A normal file ("nothing to see") |
| Combined? | Often: hide an *encrypted* message, so even if found it can't be read | |

### Where you meet it in real life

- **Digital watermarking:** photographers, film studios and printers embed invisible marks to trace leaks or prove ownership.
- **Malware:** some malware has hidden configuration or code inside images to avoid detection. Security analysts need to recognise this.
- **Covert communication:** historically, invisible ink and microdots; today, hidden data in innocent files.
- **Digital forensics:** investigators check whether files contain hidden content.

### Why it's interesting

It's a hide-and-seek game with files. You learn how images and audio are actually stored, which pays off across forensics and reverse engineering.

### How it relates to cybersecurity

Steganography is a way to move data past defences that inspect content (data loss prevention, email filters). Understanding file formats well enough to spot "this file has more inside than it should" is a core forensic and malware-analysis skill.

---

## B. Prerequisites

| Level | What | Why |
|---|---|---|
| **Essential** | Knowing files have a type and structure | The basis of every stego check. |
| **Essential** | Willingness to try many tools | Stego is a checklist sport: there are many places to hide data. |
| **Helpful** | Binary and hexadecimal | For understanding LSB and reading hex dumps. See [02 · Cryptography](02-CRYPTOGRAPHY.md#concepts-youll-use-constantly). |
| **Helpful** | How images store colour (RGB) | Explained below. |
| **Helpful** | Basic command line | `file`, `strings`, `exiftool` are quickest in a terminal. See [Linux essentials](../tools/LINUX-ESSENTIALS.md). |
| **Advanced** | Python with an imaging library | For custom extraction when tools don't fit. |

- **Programming:** not required to start.
- **Linux:** helpful (some tools like zsteg are easiest there), but browser tools cover the basics.
- **Networking:** not required.

---

## C. Understanding the challenges

### What a typical challenge looks like

> *(Fictional example written for this guide.)*
> **"Look Closer" · 100 points**
> Our designer insists this logo is just a logo. We're not so sure.
> 📎 `logo.png`

### What you're usually given

An **image** (PNG, JPG, BMP, GIF), an **audio file** (WAV, MP3), sometimes a **document** or a text file. Occasionally a password hint ("the password is the name of the cat in the photo").

### Clues to look for

| Clue | What it suggests |
|---|---|
| File is much bigger than it should be for its dimensions | Extra data appended or embedded |
| PNG or BMP (lossless) | LSB hiding is likely; it survives in lossless formats |
| JPG with a password hint | Tools like steghide, which hide data in JPEG files with a passphrase |
| Strange noise or a buzzing sound in audio | Data in the **spectrogram** (a picture of frequencies over time) |
| Text with odd spacing | Whitespace steganography |
| File won't open / looks corrupted | Damaged or edited header, see "file signatures" below |

### Common challenge patterns

1. **Metadata:** the flag is in an EXIF comment or author field.
2. **Appended data:** a ZIP or text file glued onto the end of an image.
3. **LSB (least significant bit):** data hidden in the lowest bit of pixel colour values.
4. **Bit planes / colour channels:** an image hidden in one channel or bit plane, visible only when isolated.
5. **Password-protected embedding:** steghide-style, with the password somewhere in the challenge.
6. **Audio spectrogram:** text or an image drawn into the frequencies.
7. **Broken file signature:** fix the magic bytes and the file opens.

### Common beginner mistakes

| Mistake | Better habit |
|---|---|
| Uploading a screenshot instead of the original file | Always analyse the original download. Screenshots and recompression destroy hidden data. |
| Only looking at the picture | Run the boring checks first: `file`, `exiftool`, `strings`. |
| Trying random tools without a plan | Follow the checklist in section D, in order. |
| Assuming LSB in a JPG | JPEG compression changes pixel values, so classic LSB doesn't survive. Think steghide for JPG, LSB for PNG/BMP. |
| Uploading private photos to online analysers | Only upload challenge files (see [privacy note](#privacy-note-for-online-tools)). |

---

## D. Step-by-step methodology

Work from **cheap and fast** to **slow and specific**. Each step rules out a hiding place.

### 1. Confirm the real file type

**Why:** the extension can lie. The first bytes ("magic bytes" or **file signature**) tell the truth.

```bash
file logo.png
```

Common signatures (from [Wikipedia: List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)):

| Format | First bytes (hex) | As text |
|---|---|---|
| PNG | `89 50 4E 47 0D 0A 1A 0A` | `.PNG....` |
| JPEG | `FF D8 FF` | |
| GIF | `47 49 46 38` | `GIF8` |
| ZIP (also DOCX, APK, JAR) | `50 4B 03 04` | `PK..` |
| PDF | `25 50 44 46 2D` | `%PDF-` |
| WAV | `52 49 46 46 … 57 41 56 45` | `RIFF…WAVE` |

### 2. Read the metadata

**Why:** the simplest hiding place. Takes seconds.

```bash
exiftool logo.png
```

Look at `Comment`, `Artist`, `Description`, `Software`, any unusual field.

### 3. Look for readable text

**Why:** flags are sometimes just sitting in the file as plain text.

```bash
strings logo.png | grep -i flag
strings -n 8 logo.png | less     # only sequences of 8+ printable characters
```

### 4. Check for appended or embedded files

**Why:** many formats ignore data after their "end" marker. A PNG ends with an `IEND` chunk; a JPEG with `FF D9`. Anything after that is suspicious.

- Open the file in a hex editor and scroll to the end. Look for `PK` (a ZIP) or readable text after `IEND`.
- `binwalk logo.png` lists embedded files with their offsets; `binwalk -e logo.png` extracts them.

### 5. Inspect colour channels and bit planes

**Why:** this reveals LSB and channel-based hiding.

Every pixel stores colours as numbers 0–255 for **R**ed, **G**reen, **B**lue (and sometimes **A**lpha, transparency). Each number is 8 bits. The **least significant bit** (rightmost) changes the value by only 1, which is invisible to the eye:

```
Red value 182 = 1011011 0   ← changing this last bit gives 183: same colour to a human
```

So 8 pixels' red values can carry 8 hidden bits, which is one ASCII character. A "bit plane" image shows only bit *n* of a channel as black/white, which makes hidden patterns jump out.

- Use [StegOnline](https://georgeom.net/StegOnline/) → *Browse Bit Planes*, or [Aperi'Solve](https://www.aperisolve.com/), which shows every bit plane at once.

### 6. Run automated LSB extractors

**Why:** data is often spread over several channels and bit orders. Tools try all combinations.

```bash
zsteg logo.png        # PNG and BMP only
zsteg -a logo.png     # try all known methods (slower)
```

### 7. Password-based tools (JPG/WAV/BMP)

**Why:** steghide needs a password. The challenge usually hints at one.

```bash
steghide info photo.jpg
steghide extract -sf photo.jpg     # prompts for the passphrase
```

### 8. Audio: look, don't just listen

**Why:** data can be drawn into the frequencies.

Open the file in [Audacity](https://www.audacityteam.org/) and switch the track to [Spectrogram view](https://manual.audacityteam.org/man/spectrogram_view.html), or use [Sonic Visualiser](https://www.sonicvisualiser.org/). Also listen for Morse code or DTMF (phone keypad) tones. See [08 · Miscellaneous](08-MISCELLANEOUS.md) for more audio techniques.

### Privacy note for online tools

> [!WARNING]
> **Aperi'Solve uploads your file to its server** for analysis. Its own pages also describe an optional AI panel that sends results to a provider you choose. **StegOnline** runs in your browser (its README states no data is stored or transferred). Either way: only analyse **challenge files**, never private photos or confidential documents.

---

## E. Tools and their usage

### Aperi'Solve

| | |
|---|---|
| **Website** | <https://www.aperisolve.com/> |
| **Documentation** | [Aperi'Solve on GitHub (README and wiki)](https://github.com/Zeecka/AperiSolve) |
| **Purpose** | Upload an image and get every bit plane plus the output of many stego tools (zsteg, steghide, binwalk, exiftool, foremost, strings and more) on one page |
| **Problem it solves** | Running a dozen tools without installing any of them |
| **Platform** | Browser |
| **Type · Cost** | Browser-based (server-side analysis) · Free, open source |
| **Level** | Beginner |
| **When to use** | First pass on any stego image challenge |
| **Alternative** | Install the same tools locally (zsteg, binwalk, steghide, exiftool) |

**Try it:** upload a challenge PNG, scroll through the bit-plane grid looking for text or shapes, then read the zsteg and binwalk sections.

### StegOnline

| | |
|---|---|
| **Website** | <https://georgeom.net/StegOnline/> |
| **Documentation** | [StegOnline README on GitHub](https://github.com/Ge0rg3/StegOnline) |
| **Purpose** | A browser-based port of the classic StegSolve: browse bit planes, extract LSB data, inspect colour palettes and PNG chunks |
| **Problem it solves** | Manually exploring channels and extracting bits with control over order and channels |
| **Platform** | Browser (processing happens client-side) |
| **Type · Cost** | Browser-based · Free, open source |
| **Level** | Beginner → intermediate |
| **When to use** | You suspect LSB/bit-plane hiding and want to look yourself |
| **Alternative** | StegSolve (Java desktop app), Aperi'Solve |

**Try it:** *Upload Image* → *Browse Bit Planes*, step through Red 0, Green 0, Blue 0. Then *Extract Files/Data*, tick bit 0 of R, G and B, and preview the output as text.

### ExifTool

Full entry in [01 · OSINT → ExifTool](01-OSINT.md#exiftool). In stego, use it to find comments and to compare declared dimensions with file size.

```bash
exiftool -Comment -ImageSize -FileSize logo.png
```

### Hex editors

| | |
|---|---|
| **Examples** | [HexEd.it](https://hexed.it/) (browser) · `xxd` (command line, ships with Vim and Git Bash) · ImHex or HxD (desktop) |
| **Documentation** | [xxd manual](https://manpages.debian.org/stable/xxd/xxd.1.en.html); HexEd.it has built-in help |
| **Purpose** | View and edit the raw bytes of any file |
| **Problem it solves** | Seeing magic bytes, end-of-file markers and appended data; repairing broken headers |
| **Platform** | Browser (HexEd.it, processes files locally in the browser); `xxd` on Linux/macOS/Git Bash |
| **Type · Cost** | Free |
| **Level** | Beginner |
| **When to use** | `file` says "data", the file won't open, or you suspect appended content |

**Try it:**

```bash
xxd logo.png | head -n 3     # first 48 bytes: check the PNG signature
xxd logo.png | tail -n 5     # last bytes: anything after IEND?
```

### zsteg

| | |
|---|---|
| **Website / Docs** | <https://github.com/zed-0xff/zsteg> (README is the documentation) |
| **Purpose** | Detects LSB-hidden data in **PNG and BMP** images by trying many channel/bit combinations |
| **Problem it solves** | Brute-forcing LSB extraction variants automatically |
| **Platform** | Linux, macOS (Ruby gem); on Windows via WSL |
| **Type · Cost** | Installed (command line) · Free, open source |
| **Level** | Beginner → intermediate |
| **When to use** | PNG/BMP challenge where metadata and strings found nothing |
| **Installation** | `gem install zsteg` (needs Ruby: `sudo apt install ruby` on Debian/Ubuntu) |
| **Alternative** | Aperi'Solve (runs zsteg for you); StegOnline manual extraction |

```bash
zsteg logo.png
```

### binwalk and steghide (supporting tools)

| Tool | Docs | Use | Install |
|---|---|---|---|
| binwalk | [github.com/ReFirmLabs/binwalk](https://github.com/ReFirmLabs/binwalk) | Find and extract files embedded inside other files | See its README (Rust rewrite; Docker or Cargo install); older version via `sudo apt install binwalk` |
| steghide | Included in most Linux distributions (`man steghide`) | Extract passphrase-protected data from JPG, BMP, WAV, AU | `sudo apt install steghide` |

Both are free and run by Aperi'Solve if you can't install them.

---

## F. Recommended learning resources

| Resource | Type | Why it's useful |
|---|---|---|
| [Wikipedia: List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures) | Reference | The magic bytes of hundreds of formats. Bookmark it. |
| [Aperi'Solve wiki/README](https://github.com/Zeecka/AperiSolve) | Docs | Explains each analyser it runs, which teaches you the standard toolset. |
| [StegOnline README](https://github.com/Ge0rg3/StegOnline) | Docs | Explains bit planes and extraction options. |
| [Audacity: Spectrogram view](https://manual.audacityteam.org/man/spectrogram_view.html) | Official docs | How to switch audio to a frequency picture. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | Practice (free account) | Filter by Forensics; many beginner stego-style challenges. |
| [Root-Me: Steganography](https://www.root-me.org/en/Challenges/) | Practice (free account) | A dedicated steganography category with increasing difficulty. |
| [CTFtime writeups](https://ctftime.org/writeups) | Writeups | Search "steganography" to learn new hiding tricks. |

---

## G. Mini practice exercises

### Exercise 1: LSB by hand

- **Objective:** Understand LSB without any tool.
- **Given:** The red values of 16 pixels from a fictional image:
  `182, 139, 200, 112, 119, 236, 124, 192, 248, 115, 229, 154, 109, 122, 210, 207`
- **Hints:** Odd number → last bit 1; even → 0. Group the 16 bits into two bytes, then convert each byte to ASCII (CyberChef *From Binary*).
- **Learning outcome:** You can explain exactly how LSB hides data and why it's invisible.
- **Solution:** bits `01001000 01101001` → `0x48 0x69` → **`Hi`**.

### Exercise 2: Hide and seek with your own file

- **Objective:** Create, then find, appended data.
- **Given:** Any PNG **you own** (e.g. a screenshot of your desktop) and a text file `secret.txt` containing `FLAG{look_after_iend}`.
- **Steps:**
  - Linux/macOS/Git Bash: `cat image.png secret.txt > hidden.png`
  - Windows Command Prompt: `copy /b image.png + secret.txt hidden.png`
  - Open `hidden.png`: it still displays normally. Now find the flag.
- **Hints:** `strings hidden.png | tail`, or `xxd hidden.png | tail`, or open it in HexEd.it and look after `IEND`.
- **Learning outcome:** Image viewers ignore data after the end marker, which makes it a classic hiding spot.
- **Solution:** The flag appears in the last lines of `strings`/`xxd` output, right after the `IEND` chunk.

### Exercise 3: Fix the broken header

- **Objective:** Repair a file signature.
- **Given:** A fictional file `broken.png` whose first 8 bytes are `00 00 00 00 0D 0A 1A 0A`.
- **Hints:** Compare with the signature table in section D.
- **Learning outcome:** You can recognise and fix damaged magic bytes, a common forensics step too.
- **Solution:** The first four bytes should be `89 50 4E 47` (`.PNG`). Edit them in a hex editor and save. To try it for real, copy one of your own PNGs, zero the first four bytes in HexEd.it, confirm it won't open, then restore them.

---

## H. What to learn next

| Stage | Learn | Resources |
|---|---|---|
| **Beginner** | Signatures, metadata, strings, appended data, bit planes | Exercises above, [Aperi'Solve](https://www.aperisolve.com/), [CyLab library](https://learn.cylabacademy.org/library) |
| **Intermediate** | PNG chunk structure, steghide/outguess, audio spectrograms, writing your own LSB extractor in Python | [Root-Me Steganography](https://www.root-me.org/en/Challenges/), [CTFtime writeups](https://ctftime.org/writeups) |
| **Advanced** | Statistical steganalysis, JPEG DCT-domain techniques, polyglot files | Academic papers and advanced CTF writeups |

**Related guides:** [04 · Digital forensics](04-DIGITAL-FORENSICS.md) (file carving) · [01 · OSINT](01-OSINT.md) (metadata) · [08 · Miscellaneous](08-MISCELLANEOUS.md) (audio)

---

[← 02 · Cryptography](02-CRYPTOGRAPHY.md) &nbsp;|&nbsp; [04 · Digital forensics →](04-DIGITAL-FORENSICS.md)
