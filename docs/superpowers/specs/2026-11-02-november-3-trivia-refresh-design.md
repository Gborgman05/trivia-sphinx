# November 3 Trivia Refresh

## Goal

Refresh the study site for the November 3, 2026 Beat the Geek event hosted by Ben at Juanita Cantina.

## Source

Use the published Beat the Geek homepage listing for November 3, 2026 at 7:30 PM:

1. Double D
2. U.S. Citizenship Test
3. Food Brand Logos
4. Songs of 2019
5. Idiom Nexus

Bonus: What is both the world's tallest stone structure and the world's tallest obelisk?

## Content

Create `trivia-2026-11-03-juanita-cantina.csv` with 30 distinct, fact-checked study items for rounds 1, 2, 4, and 5, totaling 120 rows. Omit round 3 because Food Brand Logos is a visual round that cannot be represented reliably as text study material.

Use the existing CSV columns and supported difficulty values. Interpret Double D according to the published category's ordinary trivia meaning: answers contain two letter Ds. For Songs of 2019, use the song title as the question and performing artist as the answer, with verified Spotify links and verified YouTube links where reliable matches are available. For Idiom Nexus, use prompts that identify two idioms joined by a shared word, with the linked idiom phrase as the answer.

## Site synchronization

Replace the weekly content in `data.js` with the CSV data while preserving the existing object structure and application behavior. Include the published bonus question as its own category. Update `README.md` with the November 3 date, categories, omitted visual round, and new CSV filename.

Do not change `app.js` or `styles.css`.

## Verification

Validate that the CSV has exactly 120 rows split evenly across rounds 1, 2, 4, and 5; all rows use supported difficulty values; non-music URL fields are empty; and music links resolve to the intended title and artist. Check `data.js` syntax and confirm its category and item counts match the CSV plus the bonus. Run the existing unit tests, serve the static site locally, and smoke-test the page and refreshed data.

## Delivery

Commit the verified refresh to the current branch. Playlist creation may be attempted with the existing helper, but missing Spotify credentials must not block the content refresh.
