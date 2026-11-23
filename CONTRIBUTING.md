# Contributing

Thanks for helping make CTF 101 better for the next group of beginners.

## What's most helpful

- **Broken or outdated links**, and platform changes (renames, pricing, account rules).
- **Factual corrections** about tools, commands or concepts.
- **Clearer explanations** for complete beginners.
- **New practice exercises**: safe, self-contained, with a verified solution.
- Typos and formatting fixes.

## Ground rules

1. **Verify before you write.** Link to official websites and documentation. Don't guess URLs, tool features or prices. If a claim may change (pricing, free tiers), say when it was checked.
2. **Stay beginner-friendly.** Explain jargon on first use or link to the [glossary](docs/glossary/CYBERSECURITY-GLOSSARY.md). Mark advanced material as advanced; never make it look mandatory.
3. **Stay legal and ethical.**
   - Exercises must use challenge material, the learner's *own* files or programs, or authorised training platforms and local labs.
   - No instructions for attacking real services, no weaponised exploit code, no OSINT on real private individuals.
   - Web and binary-exploitation content stays conceptual and points to authorised labs.
4. **Label fictional examples** as fictional. Generate example strings, hashes and ciphertexts with code and double-check the solutions.
5. **Prefer free resources**, and label anything that needs an account or payment.
6. **Keep the structure.** Category guides follow sections A–H (see any guide). Use relative links between docs and keep the prev/next navigation lines.

## Editing the presentation

The deck is plain HTML/CSS/JS, so no build step is needed. See the "Editing the slides" section of the [README](README.md#the-presentation). After changing slides:

- Open `index.html` and step through all slides (`O` for the overview).
- Check that nothing overflows the slide at a 1600×900 window, and that there are no errors in the browser console.
- If slide numbers shift, update the slide references in `docs/` and the `data-goto` values on slide 10.

## How to submit

1. Fork or branch, make your change, and check that Markdown links work (relative paths, correct `#anchors`).
2. Open a pull request describing **what** changed and **the source** you verified it against.
3. For anything security-sensitive (e.g. you think content could enable real harm), open an issue instead of a public PR and describe the concern.

## Code of conduct

Be kind and patient. Everyone here was a beginner once. Harassment, gatekeeping and sharing live-competition flags aren't welcome.
