# October 6 Trivia Refresh

## Goal

Refresh the study site for the October 6, 2026 Beat the Geek event hosted by Ben at Juanita Cantina.

## Source

Use the published Beat the Geek homepage listing for October 6, 2026 at 7:30 PM:

1. TV Character Catchphrases
2. Ancient Rome
3. Rebuses
4. Disney Covers
5. Potpourri

Bonus: What is the 3rd largest island (by area) in the world?

## Content

Create `trivia-2026-10-06-juanita-cantina.csv` with 30 distinct, fact-checked study items for rounds 1, 2, 4, and 5, totaling 120 rows. Omit round 3 because Rebuses is a visual round that cannot be represented reliably as text study material.

Use the existing CSV columns and difficulty values. For Disney Covers, treat the song title as the question and the performing artist as the answer. Include a verified YouTube URL and Spotify track URL for every music item.

## Site synchronization

Replace the weekly content in `data.js` with the CSV data while preserving the existing object structure and application behavior. Include the published bonus question as its own category. Update `README.md` with the October 6 date, categories, omitted visual round, and new CSV filename.

Do not change `app.js` or `styles.css`.

## Verification

Validate that the CSV has exactly 120 rows split evenly across rounds 1, 2, 4, and 5; all rows use supported difficulty values; non-music URL fields are empty; and all music rows have valid YouTube and Spotify URLs. Check `data.js` syntax and confirm its category and item counts match the CSV plus the bonus. Serve the static site locally and smoke-test the page and refreshed data.

## Delivery

Commit the verified refresh to `main` and push it to `origin/main`.
