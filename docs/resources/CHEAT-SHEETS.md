# Cheat Sheets

[Home](../../README.md) › **Cheat sheets** &nbsp;·&nbsp; See also: [Linux essentials](../tools/LINUX-ESSENTIALS.md) · [Glossary](../glossary/CYBERSECURITY-GLOSSARY.md)

Quick-reference tables to keep open during a CTF. Each section links to the guide that explains it properly.

---

## Contents

- [The universal first five minutes](#the-universal-first-five-minutes)
- [Encodings at a glance](#encodings-at-a-glance)
- [Hash lengths](#hash-lengths)
- [File signatures](#file-signatures)
- [CyberChef recipes](#cyberchef-recipes)
- [Python snippets](#python-snippets)
- [Wireshark display filters](#wireshark-display-filters)
- [GDB](#gdb)
- [HTTP status codes](#http-status-codes)
- [Common ports](#common-ports)

---

## The universal first five minutes

Matches slide 29 of the presentation ("How to approach any challenge").

1. **Read** the title, description and flag format twice.
2. **Identify** what you have: `file`, `exiftool`, `strings`, or look at the character set.
3. **Try the cheap wins:** decode, view source, check metadata.
4. **Search** what you see: error messages, odd strings, file types.
5. **Write notes** on everything you tried.
6. **Stuck 20+ minutes?** Re-read the description, try another challenge, come back.

## Encodings at a glance

Details: [02 · Cryptography](../categories/02-CRYPTOGRAPHY.md#clues-that-identify-the-format).

| Looks like | Example | Is probably | Decode with |
|---|---|---|---|
| `A–Za–z0–9+/`, ends with `=`/`==` | `RkxBRw==` | Base64 | CyberChef *From Base64* · `base64 -d` |
| `A–Z2–7`, ends with `=` padding | `IZGECRY=` | Base32 | CyberChef *From Base32* |
| `0–9a–f`, even length | `464c4147` | Hex | *From Hex* · `xxd -r -p` |
| Groups of 8 `0`/`1` | `01000110` | Binary | *From Binary* |
| Numbers 32–126 | `70 76 65 71` | Decimal ASCII | *From Decimal* |
| `%41%42` | `%46%4C%41%47` | URL encoding | *URL Decode* |
| `&#70;&#76;` | `&#70;&#76;&#65;&#71;` | HTML entities | *From HTML Entity* |
| Dots/dashes | `..-. .-.. .- --.` | Morse | *From Morse Code* · dCode |
| Letters shifted, `{}` kept | `SYNT{...}` | ROT13/Caesar | *ROT13* (try all shifts) |
| `+-<>[].,` only | `++++[>++...` | Brainfuck | [dCode Brainfuck](https://www.dcode.fr/brainfuck-language) |

Example values decode to `FLAG`, except the binary example (just `F`) and the Brainfuck example (truncated).

## Hash lengths

| Hex length | Bits | Likely algorithm |
|---|---|---|
| 32 | 128 | MD5 (broken, don't use for security) |
| 40 | 160 | SHA-1 (deprecated) |
| 64 | 256 | SHA-256 |
| 128 | 512 | SHA-512 |
| Starts with `$2b$` | — | bcrypt (password hash) |
| Starts with `$argon2` | — | Argon2 (password hash) |

## File signatures

Full list: [Wikipedia: List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures). Details: [03 · Steganography](../categories/03-STEGANOGRAPHY.md#1-confirm-the-real-file-type).

| Type | Hex | ASCII |
|---|---|---|
| PNG | `89 50 4E 47 0D 0A 1A 0A` | `.PNG....` |
| JPEG | `FF D8 FF` … ends `FF D9` | |
| GIF | `47 49 46 38 37 61` / `…39 61` | `GIF87a` / `GIF89a` |
| PDF | `25 50 44 46 2D` | `%PDF-` |
| ZIP / DOCX / XLSX / APK / JAR | `50 4B 03 04` | `PK..` |
| GZIP | `1F 8B` | |
| 7-Zip | `37 7A BC AF 27 1C` | `7z..'.` |
| ELF (Linux program) | `7F 45 4C 46` | `.ELF` |
| PE (Windows .exe) | `4D 5A` | `MZ` |
| WAV | `52 49 46 46` … `57 41 56 45` | `RIFF…WAVE` |
| PCAP | `D4 C3 B2 A1` (little-endian) | |
| PCAPNG | `0A 0D 0D 0A` | |

## CyberChef recipes

[Open CyberChef](https://gchq.github.io/CyberChef/). Details: [Browser tools](../tools/BROWSER-BASED-TOOLS.md#cyberchef).

| Task | Operations |
|---|---|
| Unknown encoding | **Magic** (tick *Intensive mode* for deeper search) |
| Base64 → text | From Base64 |
| Hex dump → file | From Hexdump |
| Single-byte XOR brute force | XOR Brute Force (set crib `FLAG`) |
| Caesar with unknown shift | ROT13 with varying *Amount*, or dCode's Caesar brute force |
| Decompress | Gunzip / Unzip / Bzip2 Decompress |
| Read a QR code image | Parse QR Code |
| Hash something | SHA2 / MD5 |
| Extract things | Extract URLs / Extract email addresses / Regular expression |

## Python snippets

Details: [02 · Cryptography → Python](../categories/02-CRYPTOGRAPHY.md#python).

```python
import base64, binascii, hashlib

base64.b64decode("RkxBRw==")                 # b'FLAG'
bytes.fromhex("464c4147")                    # b'FLAG'
b"FLAG".hex()                                # '464c4147'
"".join(chr(n) for n in [70, 76, 65, 71])    # 'FLAG'
[ord(c) for c in "FLAG"]                     # [70, 76, 65, 71]
int("01000110", 2)                           # 70
hashlib.sha256(b"hello").hexdigest()         # '2cf24dba...'

# XOR every byte with a key
bytes(b ^ 0x2a for b in bytes.fromhex("6c666b6d"))   # b'FLAG'

# Try all 256 single-byte XOR keys
data = bytes.fromhex("6c666b6d")
for k in range(256):
    out = bytes(b ^ k for b in data)
    if out.startswith(b"FLAG"):
        print(k, out)
```

## Wireshark display filters

Docs: [Display filters wiki](https://wiki.wireshark.org/DisplayFilters) · [Filter reference](https://www.wireshark.org/docs/man-pages/wireshark-filter.html). Details: [04 · Digital forensics](../categories/04-DIGITAL-FORENSICS.md#wireshark).

| Filter | Shows |
|---|---|
| `http` | HTTP traffic |
| `http.request` | Only HTTP requests |
| `http.request.method == "POST"` | Form submissions |
| `dns` | DNS lookups |
| `tcp.port == 22` | SSH |
| `ip.addr == 192.0.2.10` | To or from one IP |
| `ip.src == 192.0.2.10` | From one IP |
| `frame contains "flag"` | Packets containing text |
| `tcp.flags.syn == 1 && tcp.flags.ack == 0` | New TCP connection attempts |
| `!(arp or dns)` | Hide noise |

Menu shortcuts: *Statistics → Protocol Hierarchy / Conversations* · *Follow → TCP Stream* · *File → Export Objects → HTTP*.

## GDB

Docs: [GDB manual](https://sourceware.org/gdb/current/onlinedocs/gdb.html/). Details: [06 · Reverse engineering](../categories/06-REVERSE-ENGINEERING.md#gdb-gnu-debugger), [07 · Binary exploitation](../categories/07-BINARY-EXPLOITATION.md#gdb-gnu-debugger).

| Command | Short | Does |
|---|---|---|
| `run` | `r` | Start the program (`r < input.txt` feeds a file) |
| `break main` | `b main` | Pause when `main` starts |
| `break *0x401136` | | Pause at an address |
| `continue` | `c` | Run until next breakpoint |
| `next` / `step` | `n` / `s` | Next line (over / into functions) |
| `nexti` / `stepi` | `ni` / `si` | Next assembly instruction |
| `info registers` | `i r` | Show registers |
| `x/s $rdi` | | Show memory as a string |
| `x/16gx $rsp` | | Show 16 8-byte hex values at the stack pointer |
| `disassemble main` | `disas main` | Assembly of a function |
| `backtrace` | `bt` | Call stack (where am I, who called me) |
| `set disassembly-flavor intel` | | Intel syntax (easier to read) |
| `quit` | `q` | Exit |

## HTTP status codes

| Code | Meaning | CTF hint |
|---|---|---|
| 200 | OK | |
| 301 / 302 | Redirect | Read the body: content may be returned *before* redirecting |
| 400 | Bad request | Your input broke parsing; interesting |
| 401 | Unauthorised (not logged in) | |
| 403 | Forbidden (logged in, not allowed) | Access control is working, or is it everywhere? |
| 404 | Not found | |
| 500 | Server error | Your input caused an unexpected error; investigate (in the challenge) |

## Common ports

| Port | Service |
|---|---|
| 21 | FTP |
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP (email) |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 3389 | RDP (Windows Remote Desktop) |
| 8080 | Alternative HTTP |

---

[← Home](../../README.md) &nbsp;|&nbsp; [Writeups and learning →](WRITEUPS-AND-LEARNING.md)
