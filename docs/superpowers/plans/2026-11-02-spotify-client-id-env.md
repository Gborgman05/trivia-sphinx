# Spotify Client ID Environment File Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically load Spotify configuration from a local gitignored `.env` file.

**Architecture:** Add a dependency-free parser that populates missing process environment variables from the repository-root `.env`. Keep explicit environment values authoritative, then let the existing command flow consume the resulting variables.

**Tech Stack:** Python 3 standard library, `unittest`

## Global Constraints

- `.env` must remain gitignored.
- Never commit a Spotify client ID or token.
- Explicit process environment variables take precedence over `.env`.
- Do not add third-party dependencies.

---

### Task 1: Test and implement `.env` loading

**Files:**
- Modify: `tests/test_spotify_playlist.py`
- Modify: `scripts/spotify_playlist.py`
- Create locally: `.env`

**Interfaces:**
- Produces: `load_dotenv(path: Path) -> None`
- Consumes simple `KEY=VALUE` lines from `.env`

- [ ] Add tests proving that `load_dotenv` loads an unset `SPOTIFY_CLIENT_ID`, strips matching quotes, ignores comments, and preserves an existing environment value.
- [ ] Run `python3 -m unittest tests.test_spotify_playlist.SpotifyPlaylistTests.test_loads_dotenv_value tests.test_spotify_playlist.SpotifyPlaylistTests.test_dotenv_preserves_existing_environment -v`; expect failures because `load_dotenv` does not exist.
- [ ] Implement `load_dotenv` with `Path.read_text`, line parsing, and `os.environ.setdefault`; return without error when the file does not exist.
- [ ] Call `load_dotenv(root / ".env")` before reading Spotify environment variables in `main`.
- [ ] Create `.env` containing:

```dotenv
SPOTIFY_CLIENT_ID=
```

- [ ] Run `python3 -m unittest discover -s tests`; expect all tests to pass.

### Task 2: Document and verify

**Files:**
- Modify: `README.md`

**Interfaces:**
- Documents the `.env` input consumed by `scripts/spotify_playlist.py`

- [ ] Update the Spotify instructions to show `.env` as the recommended setup and `export SPOTIFY_CLIENT_ID=...` as an alternative.
- [ ] Run `git check-ignore -v .env`; expect the repository `.gitignore` rule for `.env`.
- [ ] Run `python3 -m unittest discover -s tests`, `git diff --check`, and `git status --short`.
- [ ] Confirm `.env` is absent from `git status` and no credential value appears in the diff.
- [ ] Commit tracked changes with `git commit -m "load Spotify client ID from gitignored env file"`.
