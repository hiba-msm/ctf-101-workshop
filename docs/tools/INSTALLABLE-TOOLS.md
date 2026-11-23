# Installable Toolkit

[Home](../../README.md) › **Installable tools** &nbsp;·&nbsp; Presentation: slide 28 &nbsp;·&nbsp; See also: [Browser-based tools](BROWSER-BASED-TOOLS.md) · [Linux essentials](LINUX-ESSENTIALS.md)

> [!TIP]
> **You don't need to install everything, and you don't need Kali Linux to begin.** Start with the [browser toolkit](BROWSER-BASED-TOOLS.md). Install a tool when a challenge actually needs it. The tiers below tell you what to get first.

---

## Contents

- [Tier 1: Essential beginner tools](#tier-1-essential-beginner-tools)
- [Tier 2: Useful tools to install later](#tier-2-useful-tools-to-install-later)
- [Tier 3: Advanced tools](#tier-3-advanced-tools)
- [Do I need Linux? Kali?](#do-i-need-linux-kali)
- [Safety tips for installing tools](#safety-tips-for-installing-tools)

---

## At a glance

| Tool | Tier | Categories | Windows | macOS | Linux | Cost |
|---|---|---|---|---|---|---|
| [Python](#python) | 1 | All | ✅ | ✅ | ✅ | Free |
| [Git](#git) | 1 | All (downloading tools and challenge repos) | ✅ | ✅ | ✅ | Free |
| [ExifTool](#exiftool) | 1 | OSINT, Stego, Forensics | ✅ | ✅ | ✅ | Free |
| [Wireshark](#wireshark) | 2 | Forensics, Network | ✅ | ✅ | ✅ | Free |
| [Burp Suite Community](#burp-suite-community-edition) | 2 | Web | ✅ | ✅ | ✅ | Free (Pro is paid) |
| [Ghidra](#ghidra) | 2 | Reverse engineering, Pwn | ✅ | ✅ | ✅ | Free |
| [GDB](#gdb) | 3 | Reverse engineering, Pwn | via WSL | limited | ✅ | Free |
| [Autopsy](#autopsy) | 3 | Forensics | ✅ | ✅ | ✅ | Free |

---

## Tier 1: Essential beginner tools

### Python

- **What it is:** the programming language CTF players use for scripts: brute-forcing keys, decoding data, talking to servers.
- **Why you want it:** sooner or later every category needs a 5-line script.
- **Official site:** <https://www.python.org/> · **Docs:** [docs.python.org](https://docs.python.org/3/) · **Tutorial:** [The Python Tutorial](https://docs.python.org/3/tutorial/)
- **Install:** [python.org/downloads](https://www.python.org/downloads/)
  - **Windows:** run the installer and tick **"Add python.exe to PATH"**. Then `python --version` in a new terminal (the `py` launcher also works).
  - **macOS:** installer from python.org, or `brew install python`.
  - **Linux:** usually pre-installed (`python3 --version`); otherwise `sudo apt install python3 python3-pip`.
- **First steps:** see the Caesar brute-force example in [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md#python).

### Git

- **What it is:** version control. In CTFs you'll mainly use it to download tools and challenge repositories (`git clone`), and to keep your own scripts and writeups.
- **Official site:** <https://git-scm.com/> · **Docs:** [git-scm.com/doc](https://git-scm.com/doc) · **Free book:** [Pro Git](https://git-scm.com/book/en/v2)
- **Install:** [git-scm.com/downloads](https://git-scm.com/downloads)
  - **Windows:** "Git for Windows" also installs **Git Bash**, a terminal that includes useful Unix tools like `file`, `xxd`, `base64`, `sha256sum` and `openssl`. That's a great beginner bonus.
  - **macOS:** `xcode-select --install` or `brew install git`.
  - **Linux:** `sudo apt install git`.
- **First steps:**

```bash
git clone https://github.com/<owner>/<repository>.git    # download a repository
git status                                              # see what changed in your own repo
```

### ExifTool

- **What it is:** reads (and removes) metadata in images, documents, audio and video.
- **Official site:** <https://exiftool.org/> · **Docs:** [exiftool_pod](https://exiftool.org/exiftool_pod.html) · **Install guide:** [exiftool.org/install.html](https://exiftool.org/install.html)
- **Install:**
  - **Windows:** download the Windows executable from the homepage and follow the install guide (rename to `exiftool.exe` as instructed).
  - **macOS:** `brew install exiftool` or the macOS package from the homepage.
  - **Linux:** `sudo apt install libimage-exiftool-perl`.
- **First steps:** `exiftool photo.jpg`. Details: [01 · OSINT → ExifTool](../categories/01-OSINT.md#exiftool).

> **Also useful in tier 1:** a good text editor such as [Visual Studio Code](https://code.visualstudio.com/) (free) for writing scripts and notes.

---

## Tier 2: Useful tools to install later

Install these when you start working on the matching category.

### Wireshark

- **What it is:** the standard tool for opening and analysing network captures (`.pcap`/`.pcapng`).
- **Official site:** <https://www.wireshark.org/> · **Docs:** [User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) · **Install:** [download page](https://www.wireshark.org/download.html)
- **Install notes:** the Windows installer offers Npcap; you only need it if you want to *capture* live traffic, not to open CTF files. Linux: `sudo apt install wireshark`.
- **Only capture traffic on networks you own or are allowed to monitor.** Capturing other people's traffic on shared networks may be illegal.
- **Details:** [04 · Digital forensics → Wireshark](../categories/04-DIGITAL-FORENSICS.md#wireshark).

### Burp Suite Community Edition

- **What it is:** an intercepting web proxy: see and modify every request between your browser and a web app.
- **Official site / download:** <https://portswigger.net/burp/communitydownload> · **Docs:** [Burp documentation](https://portswigger.net/burp/documentation/desktop) · [Getting started](https://portswigger.net/burp/documentation/desktop/getting-started)
- **Install notes:** the installer bundles everything; use *Proxy → Open browser* to get a pre-configured browser without changing proxy settings.
- **Use only on** CTF challenges, PortSwigger labs and local apps like OWASP Juice Shop.
- **Free alternative:** [ZAP](https://www.zaproxy.org/download/) (open source).
- **Details:** [05 · Web exploitation → Burp Suite](../categories/05-WEB-EXPLOITATION.md#burp-suite-community-edition).

### Ghidra

- **What it is:** NSA-developed, open-source reverse-engineering suite with a decompiler.
- **Official site:** <https://github.com/NationalSecurityAgency/ghidra> · **Docs:** [Getting Started](https://github.com/NationalSecurityAgency/ghidra/blob/master/GhidraDocs/GettingStarted.md) · **Download:** [Releases](https://github.com/NationalSecurityAgency/ghidra/releases)
- **Install notes:** install a 64-bit JDK first. **Ghidra 12.2 requires JDK 25**; always check the Getting Started guide for your release. Free JDK builds: [Adoptium](https://adoptium.net/). Unzip Ghidra and run `ghidraRun` / `ghidraRun.bat`. No installer needed.
- **Details:** [06 · Reverse engineering → Ghidra](../categories/06-REVERSE-ENGINEERING.md#ghidra).

---

## Tier 3: Advanced tools

### GDB

- **What it is:** the GNU Debugger: pause programs, step through them, inspect memory.
- **Official site:** <https://www.sourceware.org/gdb/> · **Docs:** [documentation](https://sourceware.org/gdb/documentation/)
- **Install:** Linux `sudo apt install gdb`. On Windows, install it inside **WSL** (see below). macOS support is limited (Apple Silicon especially); a Linux VM is easier.
- **Add-on:** [pwndbg](https://pwndbg.re/stable/setup/) makes GDB far friendlier for CTFs.
- **Details:** [06 · Reverse engineering → GDB](../categories/06-REVERSE-ENGINEERING.md#gdb-gnu-debugger), [07 · Binary exploitation](../categories/07-BINARY-EXPLOITATION.md#pwndbg).

### Autopsy

- **What it is:** graphical digital-forensics platform for disk images (deleted files, timelines, keyword search).
- **Official site:** <https://www.autopsy.com/> · **Docs:** [User Documentation](https://sleuthkit.org/autopsy/docs/user-docs/latest/) · **Download:** [autopsy.com/download](https://www.autopsy.com/download/)
- **Install notes:** Windows has an installer; Linux and macOS have separate instructions on the download page (they need The Sleuth Kit and Java).
- **Details:** [04 · Digital forensics → Autopsy](../categories/04-DIGITAL-FORENSICS.md#autopsy).

### Other advanced tools (documented in the category guides)

| Tool | Category | Guide |
|---|---|---|
| Volatility 3 | Memory forensics | [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md#volatility-3) |
| The Sleuth Kit | Disk forensics | [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md#the-sleuth-kit-tsk) |
| ZAP | Web | [05 · Web exploitation](../categories/05-WEB-EXPLOITATION.md#zap-zed-attack-proxy) |
| JADX, Detect It Easy | Reverse engineering | [06 · Reverse engineering](../categories/06-REVERSE-ENGINEERING.md#jadx) |
| pwndbg, checksec, pwntools | Binary exploitation | [07 · Binary exploitation](../categories/07-BINARY-EXPLOITATION.md#e-tools-and-their-usage) |
| zsteg, binwalk, steghide | Steganography | [03 · Steganography](../categories/03-STEGANOGRAPHY.md#zsteg) |
| OpenSSL | Cryptography | [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md#openssl) |
| Audacity, Sonic Visualiser | Misc / audio | [08 · Miscellaneous](../categories/08-MISCELLANEOUS.md#audacity) |

---

## Do I need Linux? Kali?

**To start: no.** Browser tools plus Python cover most beginner challenges on any OS.

**When you want Linux tools** (`strings`, `gdb`, `zsteg`, running Linux challenge binaries):

| Option | Good for | How |
|---|---|---|
| **WSL** (Windows Subsystem for Linux) | Windows users: a real Ubuntu terminal inside Windows | `wsl --install` in an admin PowerShell. See [Microsoft's guide](https://learn.microsoft.com/en-us/windows/wsl/install). |
| **A virtual machine** | Isolation: running untrusted binaries safely | Install Ubuntu ([download](https://ubuntu.com/download/desktop)) in a free hypervisor such as VirtualBox |
| **Kali Linux** | Later, when you want hundreds of security tools pre-installed | [Kali docs](https://www.kali.org/docs/). It's a specialist distribution, not required, and not a good daily system for beginners |

Inside Ubuntu/WSL, one line installs the most common CLI tools from this guide:

```bash
sudo apt update && sudo apt install -y binutils file xxd gdb python3-pip libimage-exiftool-perl
```

---

## Safety tips for installing tools

- Download from the **official site or official GitHub repository** linked here, not from random mirrors or YouTube descriptions.
- Be careful with `curl … | sh` one-liners: read the script or the project's docs first.
- Run unknown challenge binaries in a **VM**, not on your main system.
- Keep tools updated; old versions have bugs (and sometimes vulnerabilities).

---

[← Browser-based tools](BROWSER-BASED-TOOLS.md) &nbsp;|&nbsp; [Linux essentials →](LINUX-ESSENTIALS.md)
