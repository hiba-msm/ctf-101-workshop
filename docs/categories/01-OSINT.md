# 01 · OSINT: Open-Source Intelligence

[Home](../../README.md) › [Categories](../CATEGORIES_OVERVIEW.md) › **OSINT**
&nbsp;·&nbsp; Presentation: slides 11–12 &nbsp;·&nbsp; Next: [02 · Cryptography →](02-CRYPTOGRAPHY.md)

> [!IMPORTANT]
> OSINT skills are powerful. In CTFs you investigate **material the organisers gave you** and **public information about organisations, places and fictional characters**. Never use these techniques to track, profile or expose a real private person. That is not a grey area: it can be harassment, stalking or a privacy offence.

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

Your friend posts a photo in the group chat: "Guess where I am!" There's a tram in the background, a café sign in a language you half recognise and a church tower. Within ten minutes, you've zoomed into the sign, searched the café name, found three cities where it exists, and used the tram colour and the tower to settle on one. You just did OSINT.

### What it is

**Open-source intelligence (OSINT)** means answering a question using only information that is **publicly available**: websites, images, maps, public records, news, published documents and file metadata. "Open source" here means *open sources of information*, not open-source software.

### What problems it deals with

- *Where* was this photo taken? *When*?
- *Who* owns this website, and since when?
- *Which* organisation is behind this account or document?
- *Is* this claim, image or quote genuine, or has it been edited or taken out of context?

### Where you meet it in real life

| Field | How OSINT is used |
|---|---|
| Journalism and fact-checking | Verifying photos and videos from conflict zones; debunking fake news. [Bellingcat](https://www.bellingcat.com/) is the best-known example. |
| Security teams (blue team) | Checking what an organisation accidentally exposes online (leaked documents, forgotten servers, staff details useful to phishers). |
| Penetration testers (with a contract) | The "reconnaissance" phase of an *authorised* test. |
| Threat intelligence | Tracking public infrastructure used by known malware campaigns. |
| Everyday life | Checking whether a shop, landlord or job advert is legitimate before handing over money. |

### Why it's interesting

OSINT is detective work. It rewards curiosity, patience and lateral thinking more than technical background, which makes it one of the best first categories in a CTF.

### How it relates to cybersecurity

Attackers use OSINT before almost every targeted attack: a phishing email is far more convincing when it mentions your real manager and a real project. Defenders use the same techniques to find and remove that exposure first. Understanding OSINT also makes you more careful about what *you* publish.

---

## B. Prerequisites

| Level | What | Why |
|---|---|---|
| **Essential** | Using a search engine and a map app | That's 80% of beginner OSINT. |
| **Essential** | Patience and note-taking | You'll follow many dead ends. Notes stop you repeating them. |
| **Helpful** | Search operators (`"..."`, `site:`, `-`) | Turn millions of results into ten. Covered below. |
| **Helpful** | Basic idea of what metadata is | Files often carry hidden information (see [Glossary: metadata](../glossary/CYBERSECURITY-GLOSSARY.md#metadata)). |
| **Helpful** | Basic idea of domains and DNS | For website-ownership questions. Explained below. |
| **Advanced** | Scripting (Python) | Automating searches across many sources. Not needed to start. |

- **Programming:** not required.
- **Linux:** not required. Every essential OSINT tool works in a browser, and ExifTool runs on Windows, macOS and Linux.
- **Networking:** not required. You'll pick up what a domain, an IP address and DNS are as you go.
- **Learned while solving:** everything in the "Helpful" row.

---

## C. Understanding the challenges

### What a typical challenge looks like

> *(Fictional example written for this guide.)*
> **"Coffee Break" · 100 points**
> Our agent sent this photo from their lunch break before going silent. Which city were they in? Flag format: `FLAG{cityname}` in lowercase.
> 📎 `lunch.jpg`

### What you're usually given

| Given | Example | What it hides |
|---|---|---|
| An image | Street, landscape, screenshot | Landmarks, signs, shadows, metadata |
| A username or fictional persona | `@coffee_agent_42` | Public posts, linked accounts *set up by the organisers* |
| A domain or URL | `example-ctf-company.com` | Registration data, DNS records, archived versions |
| A document | PDF, Word file | Author name, software, creation date in the metadata |
| A short story | "She left from the oldest station in town…" | Facts you must look up and connect |

### What the description usually asks

A specific, checkable fact: a city, a street, a date, a person's (fictional) name, a phone model, the registrar of a domain. Read the **flag format** carefully. It often tells you the *type* of answer (`FLAG{yyyy-mm-dd}`).

### Clues to look for

- **Text in the image:** shop signs, street names, licence plates (country format, not the number), posters, menus.
- **Language and script:** which alphabet, which accents (ç, ß, ø)?
- **Infrastructure:** which side of the road cars drive on, road markings, bollards, power poles, tram colours.
- **Nature and sun:** vegetation, snow, shadow direction (rough hemisphere and time of day).
- **The file itself:** EXIF metadata may contain GPS coordinates, camera model and timestamp.
- **The challenge title and story:** organisers rarely write words by accident.

### Common challenge patterns

1. **Image geolocation:** find where a photo was taken.
2. **Metadata hunt:** the answer is literally inside the file's metadata.
3. **Persona trail:** a fictional character set up by the organisers has a trail across a few public platforms.
4. **Domain history:** who registered a domain, when, or what an old version of the site said (archived copies).
5. **Chained puzzle:** each answer is the key to the next search.

### Common beginner mistakes

| Mistake | Better habit |
|---|---|
| Submitting the first plausible answer | Confirm with **two independent clues**. |
| Ignoring the file and going straight to Google | Check metadata first. It takes 10 seconds. |
| Searching full sentences | Search distinctive words, exact phrases in quotes, plus operators. |
| Going down a rabbit hole for an hour | Set a timer. If a lead hasn't paid off in 15 minutes, step back. |
| Investigating real people because "it's all public" | Stay inside the challenge. Public ≠ ethical. |

---

## D. Step-by-step methodology

### 1. Read the question and the flag format

**Why:** "Which city?" and "Which café?" need very different levels of precision. Knowing the target stops you over-investigating.

Ask yourself: *What exactly is the answer? What format? Is there a hint in the title?*

### 2. Inspect the file before searching anything

**Why:** metadata can give you the answer instantly, and it's evidence nobody can "fake" by cropping.

- Run [ExifTool](#exiftool) on the original file (not a screenshot of it: screenshots and most social-media uploads strip metadata).
- Look at: `GPS Position`, `Date/Time Original`, `Make`/`Model`, `Software`, `Author`, `Comment`.

### 3. List what you can see

**Why:** writing clues down forces you to notice them and gives you search terms.

Write a short list: *"blue tram · sign 'Kaffee' · cars on the right · cobblestones · tall Gothic tower"*.

### 4. Search what you see

**Why:** search engines and reverse image search have already indexed most landmarks and signs.

- Reverse image search the whole photo, then **crop** to the most distinctive part (a sign, a building) and search again. Cropping removes noise.
- Type any readable text into a search engine in quotes.

### 5. Narrow down with operators and maps

**Why:** you probably have several candidates. Maps let you test them.

- Use [search operators](#search-operators-in-practice) to filter.
- Open candidate locations in Google Maps / Street View and compare angles, rooftops, shop fronts.

### 6. Verify with independent clues

**Why:** two clues that agree are far stronger than one. This is the core of professional fact-checking.

Example: the café exists in that city **and** the tram livery matches **and** the tower is visible from that street.

### 7. Record your path

**Why:** you'll need it for a writeup, and if the flag is rejected you can see where the chain might have broken.

### Search operators in practice

Documented in [Google Search Help: Refine web searches](https://support.google.com/websearch/answer/2466433).

| Operator | Example | Effect |
|---|---|---|
| `"..."` | `"science library"` | Exact phrase only |
| `site:` | `site:example.edu timetable` | Results from one site only |
| `-` | `jaguar -car` | Exclude a word |
| `filetype:` | `campus map filetype:pdf` | Only one file type (widely supported, less formally documented) |
| `OR` | `tram OR streetcar` | Either word |

### WHOIS, RDAP and DNS in one minute

- **Domain name:** a human-friendly name like `example.com`.
- **DNS (Domain Name System):** the internet's address book that turns names into IP addresses. DNS records also reveal mail servers (`MX`) and text notes (`TXT`).
- **WHOIS / RDAP:** public registration data for a domain: the **registrar** (the company it was bought from), the **creation and expiry dates**, and the name servers. **RDAP** is the modern, structured replacement for WHOIS. Since GDPR, the owner's personal details are usually **redacted**. That is normal and you should not try to get around it.

### Verification and source reliability

Ask of every source: *Who published it? When? Is it the original or a copy? Can I find the same fact somewhere independent?* Prefer primary sources (an official website, the original upload) over reposts. Be especially sceptical of images, which are easy to crop, mirror or re-caption.

### Privacy and ethical boundaries

- ✅ Challenge files, fictional personas, organisations, landmarks, public events, your own data.
- ✅ Checking your **own** exposure (your accounts, your photos' metadata).
- ❌ Identifying, locating or profiling real private individuals, even "just to practise".
- ❌ Logging into accounts, guessing passwords, or contacting people as part of a challenge, unless the rules explicitly say so.
- ❌ Publishing personal information you uncover ("doxxing").

If you're unsure whether something is in scope, **ask the organisers**.

---

## E. Tools and their usage

> [!TIP]
> Start with Google Lens, Google Maps and ExifTool. That trio solves most beginner OSINT challenges.

### Google Lens

| | |
|---|---|
| **Website** | <https://search.google/ways-to-search/lens/> |
| **Documentation** | [Google Lens overview](https://search.google/ways-to-search/lens/) |
| **Purpose** | Reverse image search and visual recognition |
| **Problem it solves** | "What is this landmark / object / product, and where else does this image appear?" |
| **Platform** | Browser (in Chrome via right-click → *Search with Google Lens*, or at images.google.com), Google app on Android/iOS |
| **Type · Cost** | Browser-based · Free |
| **Level** | Beginner |
| **When to use** | You have an image and need to identify a place or find the original source |
| **Alternative** | Bing Visual Search, Yandex Images (often strong for buildings), TinEye (finds exact copies) |

**Try it:** open any photo of a famous building you took yourself, right-click → *Search with Google Lens*. Then drag the selection box to only the top of the building and compare results.

### Google Maps and Street View

| | |
|---|---|
| **Website** | <https://www.google.com/maps> |
| **Documentation** | [Google Maps Help](https://support.google.com/maps/) |
| **Purpose** | Maps, satellite imagery and street-level photos |
| **Problem it solves** | Testing a candidate location by "walking" around it |
| **Platform** | Browser, Android, iOS |
| **Type · Cost** | Browser-based · Free |
| **Level** | Beginner |
| **When to use** | After you have one or more candidate places |
| **Alternative** | OpenStreetMap (<https://www.openstreetmap.org/>), Apple Maps, Bing Maps |

**Try it:** drag the yellow Pegman onto any street to enter Street View. Use the clock icon (where available) to see older imagery, which is useful when a photo is a few years old.

### ExifTool

| | |
|---|---|
| **Website** | <https://exiftool.org/> |
| **Documentation** | [ExifTool documentation](https://exiftool.org/exiftool_pod.html) |
| **Purpose** | Read and write metadata in images, PDFs, audio, video and many other formats |
| **Problem it solves** | "What hidden information is stored inside this file?" |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed (command line) · Free, open source |
| **Level** | Beginner |
| **When to use** | First thing, on every OSINT, stego or forensics file |
| **Installation** | Follow [Installing ExifTool](https://exiftool.org/install.html). Linux: `sudo apt install libimage-exiftool-perl` (Debian/Ubuntu). macOS: `brew install exiftool`. |
| **Alternative** | Browser: [Aperi'Solve](https://www.aperisolve.com/) shows ExifTool output after upload (only upload files you're allowed to share) |

**Try it:**

```bash
exiftool lunch.jpg                 # everything
exiftool -gps:all lunch.jpg        # only GPS fields
exiftool -a -G1 lunch.jpg          # show duplicates and which group each tag is from
exiftool -all= my_photo.jpg        # REMOVE all metadata from your own photo (keeps a backup copy)
```

### ICANN Lookup (WHOIS / RDAP)

| | |
|---|---|
| **Website** | <https://lookup.icann.org/> |
| **Documentation** | [ICANN: Registration Data Access Protocol (RDAP)](https://www.icann.org/rdap) |
| **Purpose** | Official lookup of domain registration data |
| **Problem it solves** | "Who is the registrar of this domain, when was it created, when does it expire?" |
| **Platform** | Browser |
| **Type · Cost** | Browser-based · Free |
| **Level** | Beginner |
| **When to use** | A challenge involves a website or domain name |
| **Alternative** | The `whois` command on Linux/macOS (`whois example.com`); registrar-run lookup pages |

**Try it:** look up `example.com`. You'll see the registrar is *RESERVED-Internet Assigned Numbers Authority* and the registration date is 14 August 1995, because `example.com` is reserved for documentation.

### OSINT Framework

| | |
|---|---|
| **Website** | <https://osintframework.com/> |
| **Documentation** | The site itself is the documentation: a clickable tree of categories |
| **Purpose** | A directory of OSINT resources, grouped by what you're looking for (domain, image, username…) |
| **Problem it solves** | "What tool even exists for this kind of question?" |
| **Platform** | Browser |
| **Type · Cost** | Browser-based · Free directory (linked tools vary: some free, some paid or requiring accounts) |
| **Level** | Beginner (to browse) |
| **When to use** | You're stuck and want ideas for a type of source you haven't tried |
| **Alternative** | [Bellingcat's Online Investigation Toolkit](https://bellingcat.gitbook.io/toolkit), which explains each tool in more detail |

> [!NOTE]
> Directories link to third-party tools. Check each tool's privacy policy, and remember that some "people search" tools listed in such directories are exactly what you should **not** use on real people.

### Have I Been Pwned

| | |
|---|---|
| **Website** | <https://haveibeenpwned.com/> |
| **Documentation** | [HIBP FAQs](https://haveibeenpwned.com/FAQs) |
| **Purpose** | Checks whether an email address appears in known, publicly reported data breaches |
| **Problem it solves** | "Has *my* account been exposed in a breach, so I should change that password?" |
| **Platform** | Browser |
| **Type · Cost** | Browser-based · Searching an email address on the front page is free. Domain-wide searches beyond a small number of addresses and the API need a paid subscription. |
| **Level** | Beginner |
| **When to use** | **Defensively**, for your own addresses or (with authorisation) your organisation's domain |

**Legitimate purpose:** HIBP was created so people can find out if *they* were affected by a breach and take action (change passwords, turn on two-factor authentication). It shows **which breaches** an address appeared in, not the leaked passwords themselves.

**Limitations:**
- It only knows about breaches that have been reported and loaded into it. "No results" does not mean "never breached".
- It does not reveal passwords or personal data to you.
- Checking other people's addresses to profile them is not what it's for. Use it on your own.

**Try it:** search your own university email. If it appears, read which breach it was and change that password wherever you reused it.

### WHOIS on the command line (optional)

| | |
|---|---|
| **Website / Docs** | `man whois` on Linux/macOS; [ICANN Lookup](https://lookup.icann.org/) is the browser equivalent |
| **Type · Cost** | Installed (pre-installed on most Linux/macOS) · Free |
| **Level** | Beginner |

```bash
whois example.com
```

---

## F. Recommended learning resources

| Resource | Type | Why it's useful |
|---|---|---|
| [Bellingcat Online Investigation Toolkit](https://bellingcat.gitbook.io/toolkit) | Free guide | Explains hundreds of OSINT tools, what they're for and their limits. Written by investigative journalists. |
| [Bellingcat guides and how-tos](https://www.bellingcat.com/category/resources/how-tos/) | Free articles | Real geolocation and verification case studies, step by step. |
| [Google Search Help: Refine web searches](https://support.google.com/websearch/answer/2466433) | Official docs | The authoritative list of search operators. |
| [ExifTool documentation](https://exiftool.org/exiftool_pod.html) | Official docs | Every option of the most important metadata tool. |
| [ICANN: about RDAP](https://www.icann.org/rdap) | Official docs | How domain registration data works and why personal data is redacted. |
| [TryHackMe: OhSINT](https://tryhackme.com/room/ohsint) | Practice room (account) | Beginner OSINT room built on a fictional persona. Check the room's free/premium label. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | Practice (free account) | The former picoCTF practice gym; filter for beginner challenges. |
| [CTFtime writeups](https://ctftime.org/writeups) | Writeups | Search "OSINT" to see how others solved past competition challenges. |

---

## G. Mini practice exercises

All exercises use public, non-personal information or **your own** files.

### Exercise 1: Operator sniper

- **Objective:** Practise combining search operators.
- **Given:** You need the official Python documentation page for the `base64` module, and you want results only from the official docs site.
- **Hints:** The official docs live on `docs.python.org`. Combine `site:` with a keyword.
- **Learning outcome:** You can restrict searches to one source, which is the fastest way to find authoritative information.
- **Solution:** search `site:docs.python.org base64`. The top result is <https://docs.python.org/3/library/base64.html>. Bonus: add `-2.7` or `"3/library"` to filter old versions.

### Exercise 2: What does your photo say about you?

- **Objective:** See metadata in a real file and learn to remove it.
- **Given:** A photo **you took yourself** with your phone, transferred as the original file (e.g. via cable or "send original" options; messaging apps usually strip metadata).
- **Hints:** `exiftool -gps:all yourphoto.jpg`. If you see no GPS, check whether location tagging is on in your camera settings.
- **Learning outcome:** You understand why OSINT investigators check metadata first, and you can protect your own privacy.
- **Solution:** GPS fields (if present) show coordinates you can paste into Google Maps. Remove all metadata with `exiftool -all= yourphoto.jpg`, then run the first command again to confirm it's gone.

### Exercise 3: Domain detective

- **Objective:** Read domain registration data.
- **Given:** The domain `example.com`.
- **Hints:** Use [ICANN Lookup](https://lookup.icann.org/). Look for "Registrar" and "Created".
- **Learning outcome:** You can answer "who registered this domain and when?", a classic OSINT flag.
- **Solution:** Registrar: *RESERVED-Internet Assigned Numbers Authority*; created **1995-08-14**. (It's reserved for documentation by IANA, which is why it's safe to practise on.)

### Exercise 4 (stretch): Geolocate your own campus

- **Objective:** Practise the full methodology.
- **Given:** Ask a friend to send you a photo **they took on your campus** without telling you where.
- **Hints:** List clues → search → confirm on Street View or a campus map → find a second clue.
- **Learning outcome:** You experience the verify-with-two-clues rule.
- **Solution:** Compare your answer with your friend's. Write down which clue was decisive.

---

## H. What to learn next

| Stage | Learn | Resources |
|---|---|---|
| **Beginner** | Operators, reverse image search, metadata, maps | Exercises above, [OhSINT](https://tryhackme.com/room/ohsint), [CyLab library](https://learn.cylabacademy.org/library) |
| **Intermediate** | Shadow and sun-angle reasoning, archived web pages, DNS records, structured note-taking | [Bellingcat how-tos](https://www.bellingcat.com/category/resources/how-tos/), past OSINT [writeups](https://ctftime.org/writeups) |
| **Advanced** | Automating collection with Python, threat-intelligence investigations, internet-wide scan data (look, never touch) | [Bellingcat toolkit](https://bellingcat.gitbook.io/toolkit), [OSINT Framework](https://osintframework.com/) |

**Related guides:** [03 · Steganography](03-STEGANOGRAPHY.md) (metadata again) · [04 · Digital forensics](04-DIGITAL-FORENSICS.md) · [Browser-based tools](../tools/BROWSER-BASED-TOOLS.md)

---

[← Categories overview](../CATEGORIES_OVERVIEW.md) &nbsp;|&nbsp; [02 · Cryptography →](02-CRYPTOGRAPHY.md)
