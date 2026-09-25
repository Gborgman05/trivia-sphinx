# trivia-sphinx

Study suite for this week's "Beat the Geek" trivia night categories (Juanita Cantina, Sep. 29, 2026): Blue Stuff, Mythological Human Hybrids, Music – 2000s Women Musicians, and Forget About It, plus the bonus question. (The picture round, this week "Pictures – Watercolor Cinema," is always round 3 at this venue and is intentionally skipped — there's no way to predict the actual image, so it can't be turned into fact-checked study material.)

Static site, no build step. Run locally with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080. Study progress ("known" cards) is saved per-browser in `localStorage`.

Content lives in `data.js`. It's generated from `trivia-2026-09-29-juanita-cantina.csv` — a curated,
120-question set (30 per round, across the 4 non-picture rounds) covering that week's real categories,
with every fact and every music round YouTube/Spotify link individually vetted.

## Regenerating for a new week

Run the `/weekly-trivia` prompt (see `.claude/commands/weekly-trivia.md`) to: find next week's real
categories from beatthegeektrivia.com, write a new `trivia-YYYY-MM-DD-juanita-cantina.csv` of 30 vetted
Q&A per category (skipping round 3, the picture round, which is always excluded), capture song title +
artist + verified YouTube/Spotify links for the Music round, and sync the result into `data.js`.

## Planned next steps (not yet built)
- Automate the `/weekly-trivia` prompt to run on a schedule (e.g. every Wednesday) instead of manually.
- Deploy to DigitalOcean App Platform for the team to use.
- Login + gamified weekly leaderboard for study activity, resetting when new categories drop.