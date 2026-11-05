# November 10 Trivia Refresh

## Goal

Refresh the study site for the November 10, 2026 Beat the Geek event hosted by Ben at Juanita Cantina.

## Source

Use the published Beat the Geek listing for November 10, 2026 at 7:30 PM:

1. Current Events
2. Science - 'Ology's
3. Celeb Shots - Famous Chickens
4. Vitamin String Quartet
5. Potpourri

Bonus: What is Macklemore's real name?

## Content

Create `trivia-2026-11-10-juanita-cantina.csv` with 30 distinct, fact-checked study items for rounds 1, 2, 4, and 5, totaling 120 rows. Omit round 3 because Celeb Shots - Famous Chickens is a visual round that cannot be represented reliably as text study material.

Current Events should emphasize significant news from the weeks immediately preceding November 10 while avoiding claims that cannot be verified from reliable reporting. Science - 'Ology's should cover scientific fields and concepts whose names end in `-ology`, with clues spanning life, earth, medical, and social sciences. Potpourri should be a balanced general-knowledge set across history, geography, science, arts, sports, and popular culture.

For Vitamin String Quartet, each row should use a recognizable song title as the question and the original performing artist as the answer. The Spotify and YouTube links should point to Vitamin String Quartet's instrumental cover of that song, not the original recording. Notes should identify VSQ as the playback artist when useful. Use nonzero playback offsets for verified YouTube links.

## Site Synchronization

Replace the weekly content in `data.js` with the CSV data while preserving the existing object structure and application behavior. Include the published bonus question with the answer `Benjamin Hammond Haggerty` and accept `Ben Haggerty` in the displayed answer. Update `README.md` with the November 10 date, categories, omitted visual round, and new CSV filename.

Do not change `app.js` or `styles.css`.

## Playlist

Create or refresh the private Spotify playlist from the new CSV. Because the music URLs point to VSQ recordings, the resulting playlist should contain the instrumental covers used for practice while the study cards continue to show original artists as answers.

## Verification

Validate that the CSV has exactly 120 rows split evenly across rounds 1, 2, 4, and 5; all rows use supported difficulty values; non-music URL fields are empty; and music links resolve to the intended VSQ cover. Check `data.js` syntax and confirm its category and item counts match the CSV plus the bonus. Run the existing unit tests, serve the static site locally, and smoke-test the page and refreshed data.

## Delivery

Commit the design, implementation plan, and verified refresh to the current branch. Playlist creation may be attempted with the existing helper, but authentication or account restrictions must not block the content refresh.
