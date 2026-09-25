# September 29 Trivia Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the study site's September 22 content with a verified 120-item study set for Juanita Cantina's September 29, 2026 event and run it locally.

**Architecture:** Add one canonical weekly CSV, transform its rows into the existing `CATEGORIES` structure in `data.js`, render their difficulty directly in the static application, and update README metadata. Use one-off Python and Node validation commands rather than adding dependencies or permanent build tooling.

**Tech Stack:** CSV, vanilla JavaScript, Python 3 standard library, Node.js, Python static HTTP server

## Global Constraints

- Event: September 29, 2026, Beat the Geek with Ben at Juanita Cantina, 7:30 PM.
- Categories: Blue Stuff; Mythological Human Hybrids; Pictures – Watercolor Cinema; Music – 2000s Women Musicians; Forget About It.
- Omit round 3 because it is a visual round.
- Bonus question: A “prickle” is a group of what animals?
- Create 30 distinct rows for each included round, totaling 120 rows.
- Use only `easy-medium`, `medium`, or `medium-hard` CSV difficulty values.
- Preserve those exact values in `data.js`; they represent difficulty, never likelihood or probability.
- Render them as `Easier`, `Moderate`, and `Challenge`, with teal/green, yellow, and red badges respectively.
- Music entries must be 2000–2009 releases by women solo artists or women-fronted acts and include verified YouTube and Spotify track URLs.
- Do not modify progress-storage behavior.
- Preserve all unrelated uncommitted work.
- Do not create git commits unless the user explicitly requests them.

---

### Task 1: Build and validate the canonical weekly CSV

**Files:**
- Create: `trivia-2026-09-29-juanita-cantina.csv`

**Interfaces:**
- Produces: CSV columns `round,category,question,answer,notes,difficulty,youtube_url,spotify_url`
- Produces: 30 rows each for rounds 1, 2, 4, and 5

- [ ] **Step 1: Research and write the four category sets**

Write 30 distinct, stable, fact-checkable entries for:

```text
1,Blue Stuff
2,Mythological Human Hybrids
4,Music - 2000s Women Musicians
5,Forget About It
```

For “Forget About It,” use memory, forgetting, amnesia, forgetfulness, and works whose titles explicitly involve forgetting as the organizing theme. For every music row, confirm the title, artist, and 2000–2009 release year from reliable search results.

- [ ] **Step 2: Verify every music link**

For each YouTube URL, call:

```bash
curl -fsS "https://www.youtube.com/oembed?url=YOUTUBE_URL&format=json"
```

Accept the URL only when the returned `title` identifies the intended song and artist. Confirm each Spotify URL is an `https://open.spotify.com/track/…` page whose search result or page metadata names the same track and artist.

- [ ] **Step 3: Run structural CSV validation**

Run:

```bash
python3 - <<'PY'
import csv
from collections import Counter
from pathlib import Path

path = Path("trivia-2026-09-29-juanita-cantina.csv")
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

### Task 2: Sync the CSV into the study application

**Files:**
- Modify: `data.js`

**Interfaces:**
- Consumes: validated `trivia-2026-09-29-juanita-cantina.csv`
- Produces: global `CATEGORIES` array consumed by `app.js`

- [ ] **Step 1: Replace weekly metadata and category data**

Set the header to the September 29 source information. Generate five category objects in this order:

```text
blue-stuff                 type: quiz   30 items
mythological-hybrids       type: quiz   30 items
music-2000s-women          type: music  30 items
forget-about-it            type: quiz   30 items
bonus                      type: quiz    1 item
```

Map CSV fields to quiz items as `{ q, a, notes, difficulty }`, and music items as `{ title, artist, youtubeId, spotifyUrl, startSeconds, difficulty, notes }`. Copy `easy-medium`, `medium`, and `medium-hard` exactly from the CSV; do not convert them to likelihood values. Omit empty `notes`. Extract `youtubeId` from the YouTube query parameter. Set every `startSeconds` to `0`.

Set the bonus item to:

```javascript
{
  q: "A “prickle” is a group of what animals?",
  a: "Porcupines"
}
```

The bonus is not one of the 120 CSV-derived items, so it has no `difficulty` field and renders no difficulty badge.

- [ ] **Step 2: Parse and validate generated JavaScript**

Run:

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
if (categories.length !== 5) throw new Error(`Expected 5 categories, got ${categories.length}`);
const expected = [
  ['blue-stuff', 'quiz', 30],
  ['mythological-hybrids', 'quiz', 30],
  ['music-2000s-women', 'music', 30],
  ['forget-about-it', 'quiz', 30],
  ['bonus', 'quiz', 1],
];
for (let i = 0; i < expected.length; i++) {
  const [id, type, count] = expected[i];
  const category = categories[i];
  if (category.id !== id || category.type !== type || category.items.length !== count) {
    throw new Error(`Unexpected category at index ${i}: ${JSON.stringify(category)}`);
  }
}
const csvItems = categories.slice(0, 4).flatMap(category => category.items);
const validDifficulties = new Set(['easy-medium', 'medium', 'medium-hard']);
if (csvItems.length !== 120 || csvItems.some(item => !validDifficulties.has(item.difficulty))) {
  throw new Error('Expected exact difficulty values on all 120 CSV-derived items');
}
if ('difficulty' in categories[4].items[0]) {
  throw new Error('Bonus item must not have a difficulty');
}
console.log('data.js validation passed: 5 categories, 121 items');
JS
```

Expected: syntax check exits successfully and validation prints `data.js validation passed: 5 categories, 121 items`.

### Task 3: Update application semantics, documentation, and run the site

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `README.md`

**Interfaces:**
- Consumes: final September 29 categories and CSV filename
- Produces: accurate operator and user documentation

- [ ] **Step 1: Update weekly README metadata**

Change the opening description to September 29, 2026 and list Blue Stuff, Mythological Human Hybrids, Music – 2000s Women Musicians, and Forget About It. Identify Pictures – Watercolor Cinema as the intentionally skipped round and `trivia-2026-09-29-juanita-cantina.csv` as the source file. Keep the local-run instructions unchanged.

- [ ] **Step 2: Render the approved difficulty semantics**

Update `app.js` to read each CSV-derived item's `difficulty` field and label the three values `Easier`,
`Moderate`, and `Challenge`. Update `styles.css` so those badges use teal/green, yellow, and red
respectively. The bonus has no difficulty field, so it must render without a badge. Preserve unrelated
application behavior and user changes.

- [ ] **Step 3: Start the static server**

Run:

```bash
python3 -m http.server 8080
```

Expected: the server remains running and reports that it is serving on port 8080.

- [ ] **Step 4: Smoke-test the served application**

In a second command, run:

```bash
curl -fsS http://localhost:8080/ >/dev/null
curl -fsS http://localhost:8080/data.js | grep -F 'Sep. 29, 2026' >/dev/null
```

Expected: both commands exit with status 0.
