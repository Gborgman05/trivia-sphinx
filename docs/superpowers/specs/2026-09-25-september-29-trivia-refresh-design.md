# September 29 Trivia Refresh

## Goal

Refresh the study site for the September 29, 2026 Beat the Geek event hosted by Ben at Juanita Cantina.

## Source categories

Use the published event listing verbatim:

1. Blue Stuff
2. Mythological Human Hybrids
3. Pictures – Watercolor Cinema
4. Music – 2000s Women Musicians
5. Forget About It

Bonus: A “prickle” is a group of what animals?

Round 3 is visual and will be omitted because its images cannot be predicted or represented as fact-checked text questions.

## Data

Create `trivia-2026-09-29-juanita-cantina.csv` with 30 distinct study items for each non-picture round, for 120 rows total. Use the repository's existing columns and the exact difficulty values `easy-medium`, `medium`, and `medium-hard`. Facts must be checkable and avoid invented or time-sensitive claims where a stable alternative is available.

Difficulty is an intrinsic property of each study item, not a prediction of how likely it is to appear. Copy the CSV values unchanged into `data.js`; do not map them to likelihood or probability. The UI labels them `Easier`, `Moderate`, and `Challenge` and uses teal/green, yellow, and red badge colors respectively. The bonus is outside the 120-row CSV, has no difficulty value, and displays no badge.

For the music round, include song title, artist, an individually checked YouTube URL, and a matching Spotify track URL. Favor recognizable songs released from 2000 through 2009 by women solo artists or women-fronted acts.

## Application changes

Replace the weekly categories and item arrays in `data.js`, including the date header and bonus answer. Update `app.js` and `styles.css` only as needed to render the approved difficulty semantics, and update `README.md` to identify the September 29 event, categories, and source CSV. Do not change progress storage or unrelated application behavior.

## Verification and run

Validate the CSV header, row count, per-round counts, required fields, difficulty values, and URL formats. Parse `data.js` to confirm five rendered categories, exact difficulty values on all 120 CSV-derived items, four 30-item rounds, and one bonus item with no difficulty. Start the documented static server on port 8080 and confirm the page responds successfully.
