# trivia-sphinx

Study suite for this week's "Beat the Geek" trivia night categories: Grand Stuff, Seattle Pro Sports, Pictures – Lines, Music – Girl Bands, and 2010s Movie Quotes, plus the bonus question.

Static site, no build step. Run locally with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open http://localhost:8080. Study progress ("known" cards) is saved per-browser in `localStorage`.

Content lives in `data.js` — edit it directly to swap in next week's real categories once they're posted.

## Planned next steps (not yet built)
- Web crawler to pull categories from beatthegeektrivia.com (Juanita Cantina) automatically each Wednesday.
- Deploy to DigitalOcean App Platform for the team to use.
- Login + gamified weekly leaderboard for study activity, resetting when new categories drop.