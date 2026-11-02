# November 3 Trivia Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the study site's October 13 content with a verified 120-item study set for Juanita Cantina's November 3, 2026 event.

**Architecture:** Research each included round independently into temporary CSV fragments, combine them into one canonical weekly CSV, and generate the existing `CATEGORIES` data structure from that source. Keep the static application's behavior unchanged and validate content, links, JavaScript structure, tests, and browser delivery before committing.

**Tech Stack:** CSV, vanilla JavaScript, Python 3 standard library, Node.js, Python static HTTP server

## Global Constraints

- Event: November 3, 2026, Beat the Geek with Ben at Juanita Cantina, 7:30 PM.
- Categories: Double D; U.S. Citizenship Test; Food Brand Logos; Songs of 2019; Idiom Nexus.
- Omit round 3 because Food Brand Logos is a visual round.
- Bonus question: What is both the world's tallest stone structure and the world's tallest obelisk?
- Bonus answer: Washington Monument.
- Create 30 distinct rows for each included round, totaling 120 rows.
- Use only `easy-medium`, `medium`, or `medium-hard` difficulty values.
- Use CSV columns `round,category,question,answer,notes,difficulty,youtube_url,spotify_url,start_seconds`.
- Every music row must have a verified Spotify track URL. Include a YouTube URL and a 10–30 second playback offset only when the video can be verified as the intended recording.
- Do not modify `app.js` or `styles.css`.
- Preserve unrelated work.

---

### Task 1: Research Double D

**Files:**
- Create: `.superpowers/sdd/nov3-round1.csv`

**Interfaces:**
- Produces 30 rows with the canonical CSV header for round `1`, category `Double D`
- Every answer contains at least two occurrences of the letter D, case-insensitively

- [ ] **Step 1: Research the study set**

Select 30 distinct, stable facts from a broad mix of history, science, geography, arts, sports, and popular culture. Verify each answer and clue against a reliable primary or reference source. Write answerable clues whose answers contain at least two letter Ds; avoid clues that reveal the answer through wording.

- [ ] **Step 2: Write the round fragment**

Write `.superpowers/sdd/nov3-round1.csv` with the exact canonical header. Set `round` to `1`, `category` to `Double D`, leave all three media fields empty, and assign one supported difficulty to each row.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path

path = Path(".superpowers/sdd/nov3-round1.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30, len(rows)
assert all(row["round"] == "1" and row["category"] == "Double D" for row in rows)
assert all(row["answer"].casefold().count("d") >= 2 for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["question"].casefold() for row in rows}) == 30
print("Round 1 validation passed")
PY
```

Expected: `Round 1 validation passed`

### Task 2: Research the U.S. Citizenship Test

**Files:**
- Create: `.superpowers/sdd/nov3-round2.csv`

**Interfaces:**
- Produces 30 rows with the canonical CSV header for round `2`, category `U.S. Citizenship Test`
- Uses official USCIS civics material, with time-sensitive answers accurate on November 2, 2026

- [ ] **Step 1: Research the study set**

Select 30 representative questions from the official USCIS civics test material, balancing government structure, rights and responsibilities, U.S. history, geography, symbols, and holidays. Verify current officeholders and any other changing answers as of November 2, 2026.

- [ ] **Step 2: Write the round fragment**

Write `.superpowers/sdd/nov3-round2.csv` with the exact canonical header. Set `round` to `2`, `category` to `U.S. Citizenship Test`, leave all three media fields empty, and use concise accepted answers. Put alternate USCIS-accepted answers or time-sensitive context in `notes`.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path

path = Path(".superpowers/sdd/nov3-round2.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30, len(rows)
assert all(row["round"] == "2" and row["category"] == "U.S. Citizenship Test" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["question"].casefold() for row in rows}) == 30
print("Round 2 validation passed")
PY
```

Expected: `Round 2 validation passed`

### Task 3: Research Songs of 2019

**Files:**
- Create: `.superpowers/sdd/nov3-round4.csv`

**Interfaces:**
- Produces 30 rows with the canonical CSV header for round `4`, category `Songs of 2019`
- Uses song title as `question`, artist as `answer`, and a unique Spotify track URL per row

- [ ] **Step 1: Select and verify songs**

Select 30 recognizable songs released in 2019 across pop, hip-hop, R&B, rock, alternative, and country. Confirm each original release date from an authoritative artist, label, chart, or music reference source. Avoid duplicate recordings and overloading one artist or genre.

- [ ] **Step 2: Verify media links**

For each song, verify an `https://open.spotify.com/track/...` URL resolves to the intended title and artist. Search for an official YouTube upload and verify it through `https://www.youtube.com/oembed?url=YOUTUBE_URL&format=json`; if verified, record the watch URL and choose a 10–30 second offset that starts after silence without immediately revealing a title lyric. Leave both `youtube_url` and `start_seconds` empty when a reliable YouTube match is unavailable.

- [ ] **Step 3: Write and validate the round fragment**

Write `.superpowers/sdd/nov3-round4.csv`, then run:

```bash
python3 - <<'PY'
import csv
import re
from pathlib import Path

path = Path(".superpowers/sdd/nov3-round4.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30, len(rows)
assert all(row["round"] == "4" and row["category"] == "Songs of 2019" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
spotify = re.compile(r"https://open\.spotify\.com/track/[A-Za-z0-9]+$")
youtube = re.compile(r"https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]+$")
assert all(spotify.fullmatch(row["spotify_url"]) for row in rows)
assert len({row["spotify_url"] for row in rows}) == 30
for row in rows:
    if row["youtube_url"]:
        assert youtube.fullmatch(row["youtube_url"]), row
        assert 10 <= int(row["start_seconds"]) <= 30, row
    else:
        assert not row["start_seconds"], row
print("Round 4 validation passed")
PY
```

Expected: `Round 4 validation passed`

### Task 4: Research Idiom Nexus

**Files:**
- Create: `.superpowers/sdd/nov3-round5.csv`

**Interfaces:**
- Produces 30 rows with the canonical CSV header for round `5`, category `Idiom Nexus`
- Each answer joins two established idioms at one exact shared word

- [ ] **Step 1: Research linked idioms**

Find 30 unique pairs of established English idioms in reputable dictionaries. Each pair must share one exact boundary word, as in `first idiom ending at WORD + WORD beginning second idiom`, and the combined phrase must preserve both complete idioms without adding or dropping words.

- [ ] **Step 2: Write the round fragment**

Write clues that independently define both source idioms and answers that merge them once at the shared word. Record the two source idioms in `notes` as `(first idiom + second idiom)`. Set `round` to `5`, `category` to `Idiom Nexus`, and leave all media fields empty.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path

path = Path(".superpowers/sdd/nov3-round5.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30, len(rows)
assert all(row["round"] == "5" and row["category"] == "Idiom Nexus" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() and row["notes"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["answer"].casefold() for row in rows}) == 30
print("Round 5 validation passed")
PY
```

Expected: `Round 5 validation passed`

### Task 5: Assemble the canonical CSV and sync the site

**Files:**
- Create: `trivia-2026-11-03-juanita-cantina.csv`
- Modify: `data.js`
- Modify: `README.md`

**Interfaces:**
- Consumes: `.superpowers/sdd/nov3-round1.csv`, `.superpowers/sdd/nov3-round2.csv`, `.superpowers/sdd/nov3-round4.csv`, `.superpowers/sdd/nov3-round5.csv`
- Produces: global `CATEGORIES` array consumed by `app.js`

- [ ] **Step 1: Combine and validate the fragments**

Concatenate the four fragments in round order under one canonical header. Validate exactly 120 rows, 30 per included round, unique questions within each round, supported difficulties, required Spotify URLs, paired optional YouTube offsets, and empty non-music media fields.

- [ ] **Step 2: Generate `data.js`**

Replace the weekly preamble and create category objects in this order:

```text
double-d                 type: quiz   30 items
us-citizenship-test      type: quiz   30 items
songs-of-2019            type: music  30 items
idiom-nexus              type: quiz   30 items
bonus                    type: quiz    1 item
```

Map quiz rows to `{ q, a, difficulty, notes? }`. Map music rows to `{ title, artist, spotifyUrl, difficulty, notes? }`, adding `youtubeId` and integer `startSeconds` only when the CSV row contains a verified YouTube URL. Add the bonus item `{ q: "What is both the world's tallest stone structure and the world's tallest obelisk?", a: "Washington Monument" }` without a difficulty.

- [ ] **Step 3: Update `README.md`**

Update the opening description and content-source paragraph for November 3, the four included categories, omitted Food Brand Logos round, and `trivia-2026-11-03-juanita-cantina.csv`. Leave the regeneration, playlist, tests, and planned-next-steps documentation intact.

- [ ] **Step 4: Validate JavaScript structure**

```bash
node --check data.js
node - <<'JS'
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('data.js', 'utf8') + '\nthis.__categories = CATEGORIES;';
const context = {};
vm.createContext(context);
vm.runInContext(source, context);
const categories = context.__categories;
const expected = [
  ['double-d', 'quiz', 30],
  ['us-citizenship-test', 'quiz', 30],
  ['songs-of-2019', 'music', 30],
  ['idiom-nexus', 'quiz', 30],
  ['bonus', 'quiz', 1],
];
if (categories.length !== expected.length) throw new Error(`Expected 5 categories, got ${categories.length}`);
expected.forEach(([id, type, count], index) => {
  const category = categories[index];
  if (category.id !== id || category.type !== type || category.items.length !== count) {
    throw new Error(`Unexpected category at index ${index}: ${JSON.stringify(category)}`);
  }
});
const csvItems = categories.slice(0, 4).flatMap(category => category.items);
const validDifficulties = new Set(['easy-medium', 'medium', 'medium-hard']);
if (csvItems.length !== 120 || csvItems.some(item => !validDifficulties.has(item.difficulty))) {
  throw new Error('Expected exact difficulty values on all 120 CSV-derived items');
}
if ('difficulty' in categories[4].items[0]) throw new Error('Bonus item must not have a difficulty');
console.log('data.js validation passed: 5 categories, 121 items');
JS
```

Expected: `data.js validation passed: 5 categories, 121 items`

### Task 6: Verify and deliver the refresh

**Files:**
- Verify: `trivia-2026-11-03-juanita-cantina.csv`
- Verify: `data.js`
- Verify: `README.md`
- Test: `tests/test_spotify_playlist.py`

**Interfaces:**
- Consumes the completed refresh
- Produces a tested commit on the current branch and, when credentials permit, a private Spotify playlist URL

- [ ] **Step 1: Run repository tests**

Run:

```bash
python3 -m unittest discover -s tests
```

Expected: all tests pass.

- [ ] **Step 2: Smoke-test static delivery**

Start `python3 -m http.server 8080`, then request `/`, `/data.js`, and `/trivia-2026-11-03-juanita-cantina.csv`. Expected: HTTP 200 for all three; manually confirm the page shows the November 3 categories and music cards expose valid available media links.

- [ ] **Step 3: Attempt playlist creation**

Run:

```bash
python3 scripts/spotify_playlist.py trivia-2026-11-03-juanita-cantina.csv
```

Expected when credentials are configured: a private `Songs of 2019 : Trivia` playlist URL. If `SPOTIFY_CLIENT_ID` or authorization is unavailable, report that limitation and continue; do not weaken CSV link validation.

- [ ] **Step 4: Review and commit**

Inspect `git diff --check`, `git diff --stat`, and `git status --short`. Confirm only the weekly CSV, `data.js`, and `README.md` are pending in addition to the already committed spec and plan. Commit with:

```bash
git add trivia-2026-11-03-juanita-cantina.csv data.js README.md
git commit -m "refresh trivia for November 3"
```
