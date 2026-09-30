# October 6 Trivia Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the study site's September 29 content with a verified 120-item study set for Juanita Cantina's October 6, 2026 event.

**Architecture:** Create one canonical weekly CSV, generate the existing `CATEGORIES` data structure from it, and update README metadata. Keep the static application's behavior unchanged and use one-off Python and Node checks for validation.

**Tech Stack:** CSV, vanilla JavaScript, Python 3 standard library, Node.js, Python static HTTP server

## Global Constraints

- Event: October 6, 2026, Beat the Geek with Ben at Juanita Cantina, 7:30 PM.
- Categories: TV Character Catchphrases; Ancient Rome; Rebuses; Disney Covers; Potpourri.
- Omit round 3 because Rebuses is a visual round.
- Bonus question: What is the 3rd largest island (by area) in the world?
- Bonus answer: Borneo.
- Create 30 distinct rows for each included round, totaling 120 rows.
- Use only `easy-medium`, `medium`, or `medium-hard` difficulty values.
- Music rows must identify a Disney-song cover title and performer and include verified YouTube and Spotify track URLs.
- Do not modify `app.js` or `styles.css`.
- Preserve unrelated work.

---

### Task 1: Build the canonical weekly CSV

**Files:**
- Create: `trivia-2026-10-06-juanita-cantina.csv`

**Interfaces:**
- Produces columns `round,category,question,answer,notes,difficulty,youtube_url,spotify_url`
- Produces exactly 30 rows each for rounds 1, 2, 4, and 5

- [ ] Research 30 stable, fact-checkable entries for TV Character Catchphrases, Ancient Rome, Disney Covers, and Potpourri.
- [ ] For Disney Covers, use the song title as `question`, performer as `answer`, and verify each YouTube oEmbed result and Spotify track page identify the intended recording.
- [ ] Combine the four sets in round order with exact category names from the published event listing.
- [ ] Validate the CSV with Python:

```bash
python3 - <<'PY'
import csv
from collections import Counter
from pathlib import Path

path = Path("trivia-2026-10-06-juanita-cantina.csv")
expected_header = [
    "round", "category", "question", "answer", "notes", "difficulty",
    "youtube_url", "spotify_url",
]
with path.open(newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    assert reader.fieldnames == expected_header, reader.fieldnames
    rows = list(reader)

assert len(rows) == 120, len(rows)
assert Counter(row["round"] for row in rows) == {"1": 30, "2": 30, "4": 30, "5": 30}
assert all(row["question"].strip() and row["answer"].strip() for row in rows)
assert {row["difficulty"] for row in rows} <= {"easy-medium", "medium", "medium-hard"}
assert len({(row["round"], row["question"].casefold()) for row in rows}) == 120
for row in rows:
    if row["round"] == "4":
        assert row["youtube_url"].startswith("https://www.youtube.com/watch?v="), row
        assert row["spotify_url"].startswith("https://open.spotify.com/track/"), row
    else:
        assert not row["youtube_url"] and not row["spotify_url"], row
print("CSV validation passed: 120 rows; 30 per included round")
PY
```

Expected: `CSV validation passed: 120 rows; 30 per included round`

### Task 2: Sync the study application

**Files:**
- Modify: `data.js`

**Interfaces:**
- Consumes: `trivia-2026-10-06-juanita-cantina.csv`
- Produces: global `CATEGORIES` array consumed by `app.js`

- [ ] Replace weekly metadata and generate these category objects in order:

```text
tv-character-catchphrases  type: quiz   30 items
ancient-rome              type: quiz   30 items
disney-covers             type: music  30 items
potpourri                 type: quiz   30 items
bonus                     type: quiz    1 item
```

- [ ] Map quiz rows to `{ q, a, notes, difficulty }`; map music rows to `{ title, artist, youtubeId, spotifyUrl, startSeconds, difficulty, notes }`; omit empty notes and set `startSeconds` to `0`.
- [ ] Add the bonus item `{ q: "What is the 3rd largest island (by area) in the world?", a: "Borneo" }` without a difficulty.
- [ ] Validate syntax and structure:

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
  ['tv-character-catchphrases', 'quiz', 30],
  ['ancient-rome', 'quiz', 30],
  ['disney-covers', 'music', 30],
  ['potpourri', 'quiz', 30],
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

### Task 3: Update documentation and verify delivery

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: final October 6 categories and CSV filename
- Produces: accurate operator documentation

- [ ] Update the opening description with the October 6 event, four included categories, omitted Rebuses round, and `trivia-2026-10-06-juanita-cantina.csv`.
- [ ] Start `python3 -m http.server 8080` and confirm `/` and `/data.js` return successfully.
- [ ] Inspect `git diff`, commit the refresh, push `main`, and confirm `main` matches `origin/main`.
