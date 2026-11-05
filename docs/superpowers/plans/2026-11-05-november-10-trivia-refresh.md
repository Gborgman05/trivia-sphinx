# November 10 Trivia Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the study site's November 3 content with a verified 120-item study set for Juanita Cantina's November 10, 2026 event.

**Architecture:** Research each included round independently into temporary CSV fragments, combine them into one canonical weekly CSV, and generate the existing `CATEGORIES` data structure from that source. Preserve the static application and verify content, media links, JavaScript structure, tests, browser delivery, and Spotify playlist creation before committing.

**Tech Stack:** CSV, vanilla JavaScript, Python 3 standard library, Node.js, Python static HTTP server

## Global Constraints

- Event: November 10, 2026, Beat the Geek with Ben at Juanita Cantina, 7:30 PM.
- Categories: Current Events; Science - 'Ology's; Celeb Shots - Famous Chickens; Vitamin String Quartet; Potpourri.
- Omit round 3 because Celeb Shots - Famous Chickens is visual.
- Bonus question: What is Macklemore's real name?
- Bonus answer: Benjamin Hammond Haggerty; display `Benjamin Hammond "Ben" Haggerty`.
- Create 30 distinct rows for each included round, totaling 120 rows.
- Use only `easy-medium`, `medium`, or `medium-hard` difficulty values.
- Use CSV columns `round,category,question,answer,notes,difficulty,youtube_url,spotify_url,start_seconds`.
- In round 4, `question` is the song title, `answer` is the original artist, and media URLs point to Vitamin String Quartet's cover.
- Do not modify `app.js` or `styles.css`.
- Preserve unrelated work and prior weekly CSV files.

---

### Task 1: Research Current Events

**Files:**
- Create: `.superpowers/sdd/nov10-round1.csv`

**Interfaces:**
- Produces 30 canonical CSV rows for round `1`, category `Current Events`
- Supplies Task 5 with stable facts from major news published shortly before November 10, 2026

- [ ] **Step 1: Research the study set**

Select 30 significant stories from reliable reporting published primarily from October 20 through November 5, 2026. Cover U.S. and international politics, science, business, culture, sports, and technology. Phrase each clue around a settled fact rather than a prediction, developing story, or partisan interpretation, and cross-check names, dates, and outcomes against at least one authoritative or widely trusted source.

- [ ] **Step 2: Write the round fragment**

Write `.superpowers/sdd/nov10-round1.csv` with the canonical header. Set `round` to `1`, `category` to `Current Events`, leave all media fields empty, and use `notes` for dates or context needed to keep time-sensitive facts precise.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path
path = Path(".superpowers/sdd/nov10-round1.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30
assert all(row["round"] == "1" and row["category"] == "Current Events" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["question"].casefold() for row in rows}) == 30
print("Round 1 validation passed")
PY
```

Expected: `Round 1 validation passed`

### Task 2: Research Science - 'Ology's

**Files:**
- Create: `.superpowers/sdd/nov10-round2.csv`

**Interfaces:**
- Produces 30 canonical CSV rows for round `2`, category `Science - 'Ology's`
- Supplies Task 5 with clues about scientific fields and concepts ending in `-ology`

- [ ] **Step 1: Research the study set**

Select 30 distinct, reference-verifiable clues spanning life, earth, medical, environmental, behavioral, and social sciences. Most answers should be an `-ology` field inferred from its subject, with a smaller number of clues asking about important discoveries, practitioners, or methods associated with those fields. Avoid pseudosciences unless the clue clearly identifies their historical or non-scientific status.

- [ ] **Step 2: Write the round fragment**

Write `.superpowers/sdd/nov10-round2.csv` with the canonical header. Set `round` to `2`, `category` to `Science - 'Ology's`, leave all media fields empty, and assign one supported difficulty to every row.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path
path = Path(".superpowers/sdd/nov10-round2.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30
assert all(row["round"] == "2" and row["category"] == "Science - 'Ology's" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["question"].casefold() for row in rows}) == 30
print("Round 2 validation passed")
PY
```

Expected: `Round 2 validation passed`

### Task 3: Research Vitamin String Quartet

**Files:**
- Create: `.superpowers/sdd/nov10-round4.csv`

**Interfaces:**
- Produces 30 canonical CSV rows for round `4`, category `Vitamin String Quartet`
- Uses original song title and artist as study answers while linking to VSQ recordings

- [ ] **Step 1: Select and verify songs**

Select 30 broadly recognizable songs covered by Vitamin String Quartet across decades and genres. Confirm the original performing artist from an authoritative music reference and confirm that VSQ released a cover of the exact song. Avoid duplicate songs, recordings, and excessive concentration on one original artist.

- [ ] **Step 2: Verify media links**

For every song, verify a unique `https://open.spotify.com/track/...` URL whose track is performed by Vitamin String Quartet. Find an official or reliably attributed YouTube upload of the same VSQ cover and validate it through YouTube's oEmbed endpoint. If verified, record the watch URL and select a 10–30 second offset; otherwise leave `youtube_url` and `start_seconds` blank.

- [ ] **Step 3: Write and validate the fragment**

Write `.superpowers/sdd/nov10-round4.csv` with song title in `question`, original artist in `answer`, the VSQ recording URLs in media fields, and a note such as `Playback: Vitamin String Quartet cover.` Then run:

```bash
python3 - <<'PY'
import csv
import re
from pathlib import Path
path = Path(".superpowers/sdd/nov10-round4.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30
assert all(row["round"] == "4" and row["category"] == "Vitamin String Quartet" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
spotify = re.compile(r"https://open\.spotify\.com/track/[A-Za-z0-9]+$")
youtube = re.compile(r"https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]+$")
assert all(spotify.fullmatch(row["spotify_url"]) for row in rows)
assert len({row["spotify_url"] for row in rows}) == 30
assert all("vitamin string quartet" in row["notes"].casefold() for row in rows)
for row in rows:
    if row["youtube_url"]:
        assert youtube.fullmatch(row["youtube_url"])
        assert 10 <= int(row["start_seconds"]) <= 30
    else:
        assert not row["start_seconds"]
print("Round 4 validation passed")
PY
```

Expected: `Round 4 validation passed`

### Task 4: Research Potpourri

**Files:**
- Create: `.superpowers/sdd/nov10-round5.csv`

**Interfaces:**
- Produces 30 canonical CSV rows for round `5`, category `Potpourri`
- Supplies Task 5 with a balanced general-knowledge study set

- [ ] **Step 1: Research the study set**

Select 30 stable facts balanced across history, geography, science, literature, film and television, music, sports, food, language, and technology. Use answerable middle-difficulty clues, avoid overlap with rounds 1 and 2, and verify each fact against an authoritative or reliable reference.

- [ ] **Step 2: Write the round fragment**

Write `.superpowers/sdd/nov10-round5.csv` with the canonical header. Set `round` to `5`, `category` to `Potpourri`, leave all media fields empty, and assign one supported difficulty to each row.

- [ ] **Step 3: Validate the fragment**

```bash
python3 - <<'PY'
import csv
from pathlib import Path
path = Path(".superpowers/sdd/nov10-round5.csv")
with path.open(newline="", encoding="utf-8") as source:
    rows = list(csv.DictReader(source))
assert len(rows) == 30
assert all(row["round"] == "5" and row["category"] == "Potpourri" for row in rows)
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert all(not row["youtube_url"] and not row["spotify_url"] and not row["start_seconds"] for row in rows)
assert len({row["question"].casefold() for row in rows}) == 30
print("Round 5 validation passed")
PY
```

Expected: `Round 5 validation passed`

### Task 5: Assemble the Canonical CSV and Sync the Site

**Files:**
- Create: `trivia-2026-11-10-juanita-cantina.csv`
- Modify: `data.js`
- Modify: `README.md`

**Interfaces:**
- Consumes the four `.superpowers/sdd/nov10-round*.csv` fragments
- Produces the global `CATEGORIES` array consumed by `app.js`

- [ ] **Step 1: Combine and validate the fragments**

Concatenate the fragments in round order under one canonical header. Validate exactly 120 rows, 30 per included round, unique questions within each round, supported difficulties, VSQ Spotify URLs, paired optional YouTube offsets, and empty non-music media fields.

- [ ] **Step 2: Generate `data.js`**

Replace the weekly preamble and create categories in this order:

```text
current-events             type: quiz   30 items
science-ologies            type: quiz   30 items
vitamin-string-quartet     type: music  30 items
potpourri                  type: quiz   30 items
bonus                      type: quiz    1 item
```

Map quiz rows to `{ q, a, difficulty, notes? }`. Map music rows to `{ title, artist, spotifyUrl, difficulty, notes? }`, adding `youtubeId` and integer `startSeconds` only when present. Add the bonus `{ q: "What is Macklemore's real name?", a: "Benjamin Hammond \"Ben\" Haggerty" }` without a difficulty.

- [ ] **Step 3: Update `README.md`**

Update the opening description and content-source paragraph for November 10, the four included categories, omitted Celeb Shots - Famous Chickens round, and `trivia-2026-11-10-juanita-cantina.csv`. Preserve the remaining documentation.

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
const expected = [
  ['current-events', 'quiz', 30],
  ['science-ologies', 'quiz', 30],
  ['vitamin-string-quartet', 'music', 30],
  ['potpourri', 'quiz', 30],
  ['bonus', 'quiz', 1],
];
const categories = context.__categories;
if (categories.length !== expected.length) throw new Error(`Expected 5 categories, got ${categories.length}`);
expected.forEach(([id, type, count], index) => {
  const category = categories[index];
  if (category.id !== id || category.type !== type || category.items.length !== count) {
    throw new Error(`Unexpected category at index ${index}`);
  }
});
const items = categories.slice(0, 4).flatMap(category => category.items);
const valid = new Set(['easy-medium', 'medium', 'medium-hard']);
if (items.length !== 120 || items.some(item => !valid.has(item.difficulty))) {
  throw new Error('Invalid CSV-derived items');
}
if ('difficulty' in categories[4].items[0]) throw new Error('Bonus must not have a difficulty');
console.log('data.js validation passed: 5 categories, 121 items');
JS
```

Expected: `data.js validation passed: 5 categories, 121 items`

### Task 6: Verify and Deliver

**Files:**
- Verify: `trivia-2026-11-10-juanita-cantina.csv`
- Verify: `data.js`
- Verify: `README.md`
- Test: `tests/test_spotify_playlist.py`

**Interfaces:**
- Consumes the completed refresh
- Produces a tested implementation commit and, when account access permits, a private playlist URL

- [ ] **Step 1: Run repository tests**

Run `python3 -m unittest discover -s tests`.

Expected: all tests pass.

- [ ] **Step 2: Smoke-test static delivery**

Start `python3 -m http.server 8080`, request `/`, `/data.js`, and `/trivia-2026-11-10-juanita-cantina.csv`, and confirm HTTP 200 for all three. Confirm the page exposes the November 10 categories and music links.

- [ ] **Step 3: Attempt playlist creation**

Run:

```bash
python3 scripts/spotify_playlist.py trivia-2026-11-10-juanita-cantina.csv
```

Expected when authentication and account access permit: a private `Vitamin String Quartet : Trivia` playlist URL. Report authentication, allowlist, or account restrictions without blocking delivery.

- [ ] **Step 4: Review and commit**

Run `git diff --check`, inspect `git diff --stat` and `git status --short`, then commit only the weekly CSV, `data.js`, and `README.md`:

```bash
git add trivia-2026-11-10-juanita-cantina.csv data.js README.md
git commit -m "refresh trivia for November 10"
```
