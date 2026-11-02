# Spotify Client ID Environment File

## Goal

Allow the Spotify playlist helper to load `SPOTIFY_CLIENT_ID` automatically from a local, gitignored `.env` file.

## Design

Create `.env` with an empty `SPOTIFY_CLIENT_ID=` assignment for the user to fill in. The existing `.gitignore` entry ensures the file and its value cannot be committed.

Add a small standard-library parser to `scripts/spotify_playlist.py`. It reads only simple `KEY=VALUE` assignments, ignores blank lines and comments, accepts optional matching single or double quotes, and never overrides variables already present in the process environment. Load the repository-root `.env` before reading `SPOTIFY_CLIENT_ID` and `SPOTIFY_REDIRECT_URI`.

Add unit tests for loading a value and preserving an explicit environment value. Update the README to document the automatic `.env` option while retaining shell export as an alternative.

## Verification

Run the existing unit tests, confirm `.env` is ignored, and verify that no credential value appears in the staged diff.
