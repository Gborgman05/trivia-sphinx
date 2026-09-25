---
description: Find this week's Beat the Geek categories for Juanita Cantina, write 30 vetted trivia Q&A across them, and sync the study site.
---

# Weekly Trivia Prep — Juanita Cantina (Beat the Geek)

Run this every week (usually Wednesday, once the coming Tuesday's categories are posted) to rebuild this
repo's content from that week's real, published categories. Work through all four steps below in order
and don't skip the verification steps — fabricated links or facts defeat the purpose of this tool.

**Venue:** Beat the Geek Trivia with Ben at Juanita Cantina, Kirkland, WA (Tuesdays, 7:30 PM).
**Source:** https://beatthegeektrivia.com/

## Step 1 — Find this week's categories

1. Fetch `https://www.beatthegeektrivia.com/` (the homepage lists upcoming events by date/venue).
2. Locate the entry for "Beat the Geek Trivia with Ben at Juanita Cantina" matching the upcoming Tuesday.
   If it's not on the homepage yet, search `beatthegeektrivia.com Juanita Cantina` and check the venue's
   dedicated events page/calendar.
3. Record verbatim: the 5 round names in order (round 4 is always the Music round), and the bonus
   question. Double check the date and host name match — the same page lists dozens of other venues'
   nights, and it's easy to grab the wrong one.
4. If the categories aren't posted yet for the target date, say so explicitly rather than guessing or
   reusing last week's categories.

## Step 2 — Write 30 Q&A per category (CSV)

Round 3 is always the picture/visual round (currently "Pictures – ___") — **always skip it**. There's no
way to predict the actual image, and no text-based tool can verify a fan-art picture against reality, so
it doesn't belong in a fact-checked CSV. That leaves 4 rounds to cover: round 1, round 2, the
Music round (round 4), and round 5.

Produce a CSV named `trivia-YYYY-MM-DD-juanita-cantina.csv` (use the actual event date) at the repo root
with columns:

```
round,category,question,answer,notes,difficulty,youtube_url,spotify_url
```

- **30 rows per category** (30 × 4 categories = 120 rows total). If a category genuinely can't support
  30 distinct, real, verifiable items (e.g. a very narrow theme), say so explicitly and get as close as
  you reasonably can rather than padding with weak or repetitive items.
- Target difficulty: **not too obvious** (skip the single most famous fact everyone already knows) and
  **not too obscure** (skip trivia only a specialist would know). Aim for the "solid bar trivia" middle —
  label each row's `difficulty` as `easy-medium`, `medium`, or `medium-hard`. Avoid `easy` and `hard`.
  Across 30 items per category, some drift toward either end is fine — just keep the average in the
  middle and avoid stacking too many at once extreme.
- Every fact must be real and checkable — use web search to verify dates, names, and spellings before
  writing a row. Do not invent plausible-sounding trivia.
- `youtube_url` / `spotify_url` are blank except for the Music round (see Step 3).
- Leave `notes` blank unless there's a genuinely useful tidbit (a disambiguation, a "why this matters"
  aside, or a heads-up that a fact might change before trivia night).

## Step 3 — Music round: title AND artist, both worth points

Round 4 (the Music round) gets the same 30-row treatment. Each row represents one song. Since a team can
score points for the title and the artist separately, capture both explicitly:

- `category` = the round's theme (e.g. "Music – Songs About Body Parts")
- `question` = the song title
- `answer` = the artist (feat. credits included, e.g. "Shakira ft. Wyclef Jean")
- Pick songs that clearly fit the theme and skew toward broadly recognizable radio/pop-culture hits —
  same difficulty guidance as Step 2 (not the single most obvious song in the theme, not a deep cut).
  Vary era/genre across the 30 so it isn't 30 of the same decade or style.

## Step 4 — Get and vet YouTube + Spotify links for every song

Do not guess IDs or paste a plausible-looking link. For each of the 30 songs in the Music round:

1. **Find a candidate YouTube video** (prefer an official audio/video upload) via web search.
2. **Vet it** by calling the oEmbed endpoint and confirming the returned title actually matches the song
   and artist:
   ```
   curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json"
   ```
   Only accept it if the `title` field clearly names the right song/artist. Reject and try another
   candidate otherwise.
3. **Find a candidate Spotify track link** (`open.spotify.com/track/...`) via web search — prefer the
   original studio version with the highest play count over remixes/live/radio-edit versions, unless the
   theme specifically calls for one of those.
4. **Vet it** the same way: fetch the page or search result snippet and confirm the title/artist match
   before including it. Cross-reference against the YouTube result (same title/artist) as a sanity check.
5. Record the full URLs in `youtube_url` (`https://www.youtube.com/watch?v=VIDEO_ID`) and `spotify_url`
   (`https://open.spotify.com/track/TRACK_ID`) columns of the CSV.

## Step 5 — Sync the study site

Once the CSV is finalized:

1. Update `data.js`:
   - Update the header comment with the new categories/date, and note that the picture round (round 3)
     is intentionally omitted.
   - Replace each category's `items` array with that round's 30 rows from the CSV (`type: 'quiz'` for
     non-music rounds using `{ q, a, notes, difficulty }`; `type: 'music'` for the Music round using
     `{ title, artist, youtubeId, spotifyUrl, startSeconds, difficulty, notes }`, extracting `youtubeId`
     from the `youtube_url` column). Preserve each CSV `difficulty` value exactly; do not translate it
     into likelihood or probability. Do not include a category for round 3.
   - Keep (or replace) the `bonus` category with the week's actual bonus question from Step 1. The bonus
     does not come from the CSV and should not have a `difficulty` field or badge.
2. Update `README.md`'s first line to name the new date/categories, and mention the CSV filename.
3. Leave `app.js` / `styles.css` alone unless the CSV introduces a new field they don't already render.
