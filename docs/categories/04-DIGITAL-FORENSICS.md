# 04 · Digital Forensics

[Home](../../README.md) › [Categories](../CATEGORIES_OVERVIEW.md) › **Digital forensics**
&nbsp;·&nbsp; Presentation: slides 17–18 &nbsp;·&nbsp; [← 03 · Steganography](03-STEGANOGRAPHY.md) · [05 · Web exploitation →](05-WEB-EXPLOITATION.md)

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

The night before a deadline, your laptop "eats" your report. The file is gone from the folder and the recycle bin is empty. But a classmate who knows forensics finds it: deleting a file usually only removes the *pointer* to its data, not the data itself. Ten minutes later you have your report back. Forensics is the art of reconstructing what happened from the traces computers leave behind.

### What it is

**Digital forensics** is the collection, preservation and analysis of digital evidence to answer questions like *what happened, when, how, and by whom?* In CTFs you're the investigator: you receive a disk image, a memory dump, a network capture or a pile of logs, and you dig out the story (and the flag).

### What problems it deals with

- Recovering deleted or hidden files.
- Reconstructing a timeline of events.
- Finding out what a program or user did on a system.
- Following an attacker through network traffic and logs.

### Where you meet it in real life

| Field | Example |
|---|---|
| Incident response | A company is hacked: forensics finds how the attacker got in and what they took. |
| Law enforcement | Evidence from seized devices, under strict legal procedures. |
| Corporate investigations | Policy violations, data leaks, insider cases. |
| Data recovery | Getting lost files back from damaged drives. |
| Security operations centres (SOC) | Analysts read logs and traffic every day. |

### Why it's interesting

It's detective work with real evidence. Each file, log line and packet is a clue. You also learn how operating systems, file systems and networks really work.

### How it relates to cybersecurity

When prevention fails, forensics is how organisations understand and recover. It's one of the most in-demand **defensive** skills, and CTF forensics is close to real blue-team work.

---

## B. Prerequisites

| Level | What | Why |
|---|---|---|
| **Essential** | Files, folders, file types | Everything starts with "what is this file?" |
| **Essential** | Patience and note-taking | Investigations involve lots of data; notes build your timeline. |
| **Helpful** | Basic command line (`file`, `strings`, `grep`) | The fastest way to triage evidence. See [Linux essentials](../tools/LINUX-ESSENTIALS.md). |
| **Helpful** | Hexadecimal and file signatures | Identify and repair files. See [03 · Steganography](03-STEGANOGRAPHY.md#1-confirm-the-real-file-type). |
| **Helpful** | Basic networking: IP addresses, ports, HTTP, DNS | Needed for PCAP challenges. Introduced below. |
| **Advanced** | File systems (NTFS, ext4), Windows internals (registry, event logs) | For disk and memory challenges beyond beginner level. |

- **Programming:** not required. Python helps for parsing large logs later.
- **Linux:** helpful; most command-line forensic tools originate there (Windows users can use WSL or Git Bash for the basics).
- **Networking:** helpful for PCAP challenges, and learnable while solving.

---

## C. Understanding the challenges

### What a typical challenge looks like

> *(Fictional example written for this guide.)*
> **"Midnight Login" · 150 points**
> Our web server acted strangely last night. Here are the SSH logs and a traffic capture. Which account did the attacker get into?
> 📎 `auth.log`, `traffic.pcap`

### What you're usually given

| Evidence | Typical extensions | What's inside |
|---|---|---|
| Unknown file | none, `.bin`, `.dat` | Could be anything; identify it first |
| Network capture | `.pcap`, `.pcapng` | Recorded network packets (web requests, DNS lookups, file transfers) |
| Logs | `.log`, `.txt`, `.evtx` | Timestamped events: logins, errors, requests |
| Disk image | `.dd`, `.img`, `.raw`, `.E01` | A bit-for-bit copy of a drive or partition |
| Memory dump | `.raw`, `.mem`, `.vmem` | A snapshot of RAM: running processes, open connections, sometimes passwords |
| Documents | `.docx`, `.pdf`, `.zip` | Metadata, embedded objects, macros |

### Clues to look for

- `file` says something different from the extension.
- Timestamps that cluster around a suspicious time.
- Repeated failed logins from one address, followed by a success.
- HTTP requests for unusual files; file downloads in a capture.
- Deleted-file entries in a disk image.
- Processes with odd names or parents in a memory dump.

### Common challenge patterns

1. **Identify and repair** a file with the wrong extension or a damaged header.
2. **PCAP analysis:** find credentials sent in clear text, a downloaded file, or a DNS query that spells the flag.
3. **Log analysis:** find the attacker's IP, the compromised account, the time of compromise.
4. **Disk image:** recover a deleted file or find a hidden partition.
5. **Memory forensics:** list processes, find a command the attacker typed.
6. **File carving:** extract files from raw data without file-system information.

### Common beginner mistakes

| Mistake | Better habit |
|---|---|
| Opening a huge PCAP and scrolling | Use **Statistics → Protocol Hierarchy** and **Conversations** first, then filter. |
| Modifying the original evidence | Work on a **copy**. Record a hash of the original. |
| Not noting times and sources | Keep a simple timeline: time · source · event. |
| Trusting file extensions | Run `file`. |
| Forgetting timezones | Note whether timestamps are UTC or local. |

---

## D. Step-by-step methodology

### 1. Preserve and document

**Why:** in real forensics, evidence must be shown to be **unchanged** (integrity) and its handling recorded (**chain of custody**). CTFs don't check this, but good habits make you trustworthy later.

```bash
sha256sum evidence.pcap > evidence.sha256      # Linux/macOS/Git Bash
Get-FileHash evidence.pcap -Algorithm SHA256    # Windows PowerShell
```

Work on a copy. If the hash ever changes, you've modified the evidence.

### 2. Identify what you have

**Why:** the type of evidence decides the toolset.

```bash
file mystery.bin
xxd mystery.bin | head
```

### 3. Triage quickly

**Why:** cheap commands often reveal the flag or the next lead immediately.

```bash
strings -n 6 mystery.bin | grep -i -E "flag|pass|user|http"
exiftool document.pdf
```

### 4. Choose the right deep-dive tool

| Evidence | Tool | First thing to do |
|---|---|---|
| PCAP | Wireshark | *Statistics → Protocol Hierarchy*, then filter `http` or `dns` |
| Logs | `grep`, a text editor, Python | Search for failures, errors, unusual IPs |
| Disk image | Autopsy, The Sleuth Kit | Open as a data source; look at deleted files and recent documents |
| Memory dump | Volatility 3 | `windows.info` / `windows.pslist` (or the Linux equivalents) |
| Odd data blob | CyberChef, binwalk | Try decoding; look for embedded files |

### 5. Build a timeline

**Why:** events make sense in order. "Failed logins at 02:13, success at 02:13:09, new file downloaded at 02:15" tells a story.

### 6. Answer the question and verify

**Why:** a timeline lets you double-check: does the account you found really have a successful login after the failures, from the same IP?

### Network traffic in one minute

- A **packet** is a small chunk of data sent over a network. A **PCAP** file is a recording of packets.
- Each packet has a source and destination **IP address** (which computer) and **port** (which service: 80 = HTTP, 443 = HTTPS, 53 = DNS, 22 = SSH).
- **HTTP** is readable in a capture; **HTTPS** is encrypted, so you'll only see where traffic went, not its content (unless the challenge gives you the keys).

### Memory forensics in one minute

RAM contains what the computer was doing *right now*: running programs, network connections, command history, sometimes decrypted data and passwords. A **memory dump** freezes that. Tools like Volatility rebuild lists of processes and connections from the raw bytes.

### File carving in one minute

When file-system information is missing, you can still find files by searching raw data for **signatures**: a JPEG starts with `FF D8 FF` and ends with `FF D9`, so everything in between is probably an image. Tools like `foremost`, `binwalk` and Autopsy automate carving.

### Evidence integrity and documentation

- Hash the original. Work on copies.
- Write down every step: tool, command, what you found, time.
- In real investigations, use write-blockers and follow legal procedures. And only examine devices and data you're **authorised** to examine.

---

## E. Tools and their usage

### Wireshark

| | |
|---|---|
| **Website** | <https://www.wireshark.org/> |
| **Documentation** | [User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) · [Display filters](https://wiki.wireshark.org/DisplayFilters) · [Sample captures](https://wiki.wireshark.org/SampleCaptures) |
| **Purpose** | The standard network protocol analyser |
| **Problem it solves** | Reading and filtering recorded network traffic packet by packet |
| **Platform** | Windows, macOS, Linux |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Beginner → advanced |
| **When to use** | Any `.pcap`/`.pcapng` challenge |
| **Installation** | [wireshark.org/download.html](https://www.wireshark.org/download.html); Linux: `sudo apt install wireshark`. You don't need capture permissions just to *open* files. |
| **Alternative** | `tshark` (Wireshark's command-line version); browser: CyberChef can't parse PCAP, so install Wireshark for this |

**Try it:**

```text
http                           only HTTP traffic
dns                            only DNS lookups
ip.addr == 192.0.2.10          traffic to or from one address
tcp.port == 22                 SSH traffic
http.request.method == "POST"  form submissions (look for credentials in CTFs)
frame contains "flag"          any packet containing the text "flag"
```

Then: right-click a packet → **Follow → TCP Stream** to read a whole conversation; **File → Export Objects → HTTP** to save transferred files.

### Autopsy

| | |
|---|---|
| **Website** | <https://www.autopsy.com/> |
| **Documentation** | [Autopsy User Documentation](https://sleuthkit.org/autopsy/docs/user-docs/latest/) |
| **Purpose** | Graphical digital-forensics platform built on The Sleuth Kit |
| **Problem it solves** | Browsing disk images like a file explorer, including deleted files, timelines, web history, keyword search |
| **Platform** | Windows (installer); Linux and macOS (see download page) |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Intermediate (easy to start, deep to master) |
| **When to use** | Disk-image challenges |
| **Installation** | [autopsy.com/download](https://www.autopsy.com/download/) |
| **Alternative** | The Sleuth Kit on the command line |

**Try it:** *New Case* → *Add Data Source* → *Disk Image* → choose the `.dd`/`.E01` file. Explore *Deleted Files*, *File Types* and *Timeline*.

### The Sleuth Kit (TSK)

| | |
|---|---|
| **Website** | <https://www.sleuthkit.org/> |
| **Documentation** | [TSK documentation](https://www.sleuthkit.org/sleuthkit/docs.php) · [TSK wiki](https://github.com/sleuthkit/sleuthkit/wiki) |
| **Purpose** | Command-line tools for analysing disk images and file systems |
| **Problem it solves** | Listing partitions, files (including deleted ones) and extracting file contents by inode |
| **Platform** | Linux, macOS, Windows |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Intermediate |
| **Installation** | Linux: `sudo apt install sleuthkit`; others: [download page](https://www.sleuthkit.org/sleuthkit/download.php) |
| **Alternative** | Autopsy (graphical front end to TSK) |

```bash
mmls disk.img             # list partitions and their start offsets
fls -r -o 2048 disk.img   # list files recursively in the partition starting at sector 2048 (deleted ones marked *)
icat -o 2048 disk.img 15 > recovered.txt   # extract the file with inode 15
```

### Volatility 3

| | |
|---|---|
| **Website** | <https://github.com/volatilityfoundation/volatility3> |
| **Documentation** | [Volatility 3 docs](https://volatility3.readthedocs.io/en/stable/) |
| **Purpose** | Memory-forensics framework |
| **Problem it solves** | Extracting processes, command lines, network connections and more from RAM dumps |
| **Platform** | Windows, macOS, Linux (Python 3) |
| **Type · Cost** | Installed · Free, open source |
| **Level** | Intermediate → advanced |
| **When to use** | Memory-dump challenges |
| **Installation** | `pip install volatility3` (provides the `vol` command) |
| **Alternative** | None as widely used for CTFs |

```bash
vol -f memory.raw windows.info       # what system is this?
vol -f memory.raw windows.pslist     # running processes
vol -f memory.raw windows.cmdline    # command line of each process
vol -f memory.raw windows.netscan    # network connections
```

### CyberChef

Full entry in [02 · Cryptography → CyberChef](02-CRYPTOGRAPHY.md#cyberchef). In forensics: decode Base64 blobs found in logs or traffic, decompress data (*Gunzip*, *Unzip*), and render hex dumps (*From Hexdump*).

### Linux utilities: `file`, `strings`, `xxd`

| Tool | Docs | What it does | Available on |
|---|---|---|---|
| `file` | [man page](https://man7.org/linux/man-pages/man1/file.1.html) | Identifies file type from its content (magic bytes) | Linux, macOS, Git Bash |
| `strings` | [man page](https://man7.org/linux/man-pages/man1/strings.1.html) · [GNU binutils](https://sourceware.org/binutils/docs/binutils/strings.html) | Prints readable text inside binary files | Linux, macOS; not in Git Bash (use WSL) |
| `xxd` | [man page](https://manpages.debian.org/stable/xxd/xxd.1.en.html) | Hex dump of a file (and back with `-r`) | Linux, macOS, Git Bash |

All free, all beginner level. More in [Linux essentials](../tools/LINUX-ESSENTIALS.md).

---

## F. Recommended learning resources

| Resource | Type | Why it's useful |
|---|---|---|
| [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) | Official docs | Complete reference for the most important network tool. |
| [Wireshark sample captures](https://wiki.wireshark.org/SampleCaptures) | Practice files | Real PCAPs for safe practice. |
| [TryHackMe: Wireshark: The Basics](https://tryhackme.com/room/wiresharkthebasics) | Practice room (account) | Guided introduction to Wireshark's interface. Check the room's free/premium label. |
| [CyberDefenders](https://cyberdefenders.org/) | Practice (account) | Blue-team investigation labs with PCAPs, disk and memory images. |
| [Volatility 3 docs](https://volatility3.readthedocs.io/en/stable/) | Official docs | Plugin list and usage. |
| [Autopsy User Documentation](https://sleuthkit.org/autopsy/docs/user-docs/latest/) | Official docs | Walkthrough of every Autopsy feature. |
| [CyLab Security Academy library](https://learn.cylabacademy.org/library) | Practice (free account) | Filter by Forensics; many beginner challenges. |
| [Root-Me: Forensic](https://www.root-me.org/en/Challenges/) | Practice (free account) | Progressive forensics challenges. |

---

## G. Mini practice exercises

### Exercise 1: What is this file?

- **Objective:** Identify files by their signatures.
- **Given:** The first bytes of four fictional files:
  1. `25 50 44 46 2D 31 2E 37`
  2. `50 4B 03 04 14 00 06 00`
  3. `FF D8 FF E0 00 10 4A 46`
  4. `7F 45 4C 46 02 01 01 00`
- **Hints:** [Wikipedia: List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures). Try converting the hex to text in CyberChef (*From Hex*).
- **Learning outcome:** You can identify file types without trusting the extension.
- **Solution:** 1 → **PDF** (`%PDF-1.7`) · 2 → **ZIP** container (could also be DOCX/XLSX/APK, which are ZIP-based) · 3 → **JPEG** (`JF` = start of "JFIF") · 4 → **ELF** executable (Linux program).

### Exercise 2: Midnight login (log analysis)

- **Objective:** Find the attacker in a log.
- **Given:** This fictional `auth.log` (IP addresses are from ranges reserved for documentation):

```text
Nov 20 02:12:58 web01 sshd[2098]: Failed password for invalid user admin from 203.0.113.45 port 51520 ssh2
Nov 20 02:13:01 web01 sshd[2101]: Failed password for invalid user admin from 203.0.113.45 port 51522 ssh2
Nov 20 02:13:03 web01 sshd[2104]: Failed password for root from 203.0.113.45 port 51526 ssh2
Nov 20 02:13:05 web01 sshd[2108]: Failed password for root from 203.0.113.45 port 51530 ssh2
Nov 20 02:13:06 web01 sshd[2111]: Failed password for backup from 203.0.113.45 port 51536 ssh2
Nov 20 02:13:08 web01 sshd[2114]: Failed password for backup from 203.0.113.45 port 51540 ssh2
Nov 20 02:13:09 web01 sshd[2117]: Accepted password for backup from 203.0.113.45 port 51544 ssh2
Nov 20 09:02:44 web01 sshd[3001]: Accepted publickey for alice from 198.51.100.7 port 60122 ssh2
```

- **Questions:** Which IP is attacking? How many failures? Which account was compromised, and when?
- **Hints:** `grep "Failed password" auth.log | wc -l` and `grep "Accepted" auth.log`. On Windows: `Select-String "Failed password" auth.log`.
- **Learning outcome:** You recognise a brute-force pattern (many failures, then a success, from the same IP).
- **Solution:** IP **203.0.113.45**, **6** failures, account **backup** compromised at **02:13:09**. Alice's login at 09:02 uses a public key from a different IP and looks normal.

### Exercise 3: Your first PCAP

- **Objective:** Open a real capture and read an HTTP request.
- **Given:** `http.cap` from [Wireshark's sample captures](https://wiki.wireshark.org/SampleCaptures) (a small, harmless HTTP capture).
- **Hints:** Filter `http.request`. Look at the first request's *Host* header. Then *Follow → TCP Stream*.
- **Learning outcome:** You can filter traffic and read an HTTP conversation.
- **Solution:** The first request is `GET /download.html` to host **www.ethereal.com** (Ethereal was Wireshark's former name), answered by `HTTP/1.1 200 OK` from an Apache server.

### Exercise 4: Integrity check

- **Objective:** See why investigators hash evidence.
- **Given:** Any text file you create.
- **Steps:** Hash it (`sha256sum file.txt` or `Get-FileHash file.txt`), change one character, hash again.
- **Learning outcome:** Any change, however small, produces a completely different hash, so hashes prove evidence wasn't altered.
- **Solution:** The two hashes share no visible similarity.

---

## H. What to learn next

| Stage | Learn | Resources |
|---|---|---|
| **Beginner** | File identification, `strings`, metadata, Wireshark filters, log reading | Exercises above, [CyLab library](https://learn.cylabacademy.org/library), [Wireshark: The Basics](https://tryhackme.com/room/wiresharkthebasics) |
| **Intermediate** | Disk images with Autopsy/TSK, memory with Volatility, Windows event logs, timelines | [CyberDefenders](https://cyberdefenders.org/), [Root-Me Forensic](https://www.root-me.org/en/Challenges/) |
| **Advanced** | Malware triage, file-system internals, large-scale log analysis (SIEM), incident-response reporting | [Volatility 3 docs](https://volatility3.readthedocs.io/en/stable/), advanced DFIR CTFs on [CTFtime](https://ctftime.org/) |

**Related guides:** [03 · Steganography](03-STEGANOGRAPHY.md) · [05 · Web exploitation](05-WEB-EXPLOITATION.md) (HTTP basics) · [Linux essentials](../tools/LINUX-ESSENTIALS.md)

---

[← 03 · Steganography](03-STEGANOGRAPHY.md) &nbsp;|&nbsp; [05 · Web exploitation →](05-WEB-EXPLOITATION.md)
