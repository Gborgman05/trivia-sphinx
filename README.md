# trivia-sphinx

Study suite for this week's "Beat the Geek" trivia night categories (Juanita Cantina, Oct. 6, 2026): TV Character Catchphrases, Ancient Rome, Disney Covers, and Potpourri, plus the bonus question. (The visual round, this week "Rebuses," is intentionally skipped because it cannot be turned into reliable text study material.)

Static site, no build step. Run locally with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080. Study progress ("known" cards) is saved per-browser in `localStorage`.

Content lives in `data.js`. It's generated from `trivia-2026-10-06-juanita-cantina.csv` — a curated,
120-question set (30 per round, across the 4 non-visual rounds) covering that week's real categories,
with every fact and every music round YouTube/Spotify link individually vetted.

## Regenerating for a new week

Run the `/weekly-trivia` prompt (see `.claude/commands/weekly-trivia.md`) to: find next week's real
categories from beatthegeektrivia.com, write a new `trivia-YYYY-MM-DD-juanita-cantina.csv` of 30 vetted
Q&A per category (skipping round 3, the visual round, which is always excluded), capture song title +
artist + verified YouTube/Spotify links for the Music round, and sync the result into `data.js`.

## Spotify playlist

Create or refresh a private playlist from the newest weekly CSV:

```bash
export SPOTIFY_CLIENT_ID="your Spotify app client ID"
python3 scripts/spotify_playlist.py
```

The Spotify app must allow the redirect URI `http://127.0.0.1:8888/callback`. The first run opens a
browser for authorization; later runs reuse a locally cached refresh token. The token file is gitignored.
The app owner must have Spotify Premium, and Development Mode users must be on the app's allowlist.
Pass `--public` to create a public playlist instead. If Spotify revokes the cached authorization, the
script automatically opens a fresh login.

## Tests

The Spotify helper is covered by stdlib `unittest` (no third-party dependencies):

```bash
python3 -m unittest discover -s tests
```

## Planned next steps (not yet built)
- Automate the `/weekly-trivia` prompt to run on a schedule (e.g. every Wednesday) instead of manually.
- Deploy the static site to a host so the study set is reachable without running it locally.
- Login + gamified weekly leaderboard for study activity, resetting when new categories drop.

## License

MIT — see [LICENSE](LICENSE).
