import base64
import hashlib
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts import spotify_playlist  # noqa: E402
from scripts.spotify_playlist import (  # noqa: E402
    SpotifyClient,
    build_playlist_name,
    load_track_uris,
    pkce_challenge,
    save_token,
)


class SpotifyPlaylistTests(unittest.TestCase):
    def test_loads_music_tracks_in_csv_order(self):
        event_date, uris = load_track_uris(
            ROOT / "trivia-2026-10-06-juanita-cantina.csv"
        )

        self.assertEqual(event_date, "2026-10-06")
        self.assertEqual(len(uris), 30)
        self.assertEqual(len(set(uris)), 30)
        self.assertEqual(uris[0], "spotify:track:5ohYQZfcLlD4Lvf8lt3VCA")
        self.assertEqual(uris[-1], "spotify:track:4viVOQNAlEptAKjavq4qq1")

    def test_rejects_invalid_spotify_track_url(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "trivia-2026-10-06-juanita-cantina.csv"
            path.write_text(
                "round,spotify_url\n4,https://open.spotify.com/album/not-a-track\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "Invalid Spotify track URL"):
                load_track_uris(path)

    def test_builds_dated_playlist_name(self):
        self.assertEqual(
            build_playlist_name("2026-10-06"),
            "Beat the Geek — Juanita Cantina — 2026-10-06",
        )

    def test_generates_standard_pkce_challenge(self):
        verifier = "known-verifier"
        expected = base64.urlsafe_b64encode(
            hashlib.sha256(verifier.encode("ascii")).digest()
        ).rstrip(b"=").decode("ascii")

        self.assertEqual(pkce_challenge(verifier), expected)

    def test_saves_token_with_owner_only_permissions(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "token.json"
            token = save_token(
                path,
                {"access_token": "new", "expires_in": 3600},
                previous={"refresh_token": "existing"},
            )

            self.assertEqual(path.stat().st_mode & 0o777, 0o600)
            self.assertEqual(token["refresh_token"], "existing")

    def test_falls_back_to_authorization_when_refresh_token_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "token.json"
            path.write_text(
                '{"access_token":"old","refresh_token":"revoked","expires_at":0}',
                encoding="utf-8",
            )

            with (
                mock.patch.object(
                    spotify_playlist,
                    "refresh_access_token",
                    side_effect=RuntimeError("invalid_grant"),
                ),
                mock.patch.object(
                    spotify_playlist,
                    "authorize",
                    return_value={"access_token": "reauthorized"},
                ) as authorize,
            ):
                access_token = spotify_playlist.get_access_token(
                    "client", "http://127.0.0.1:8888/callback", path
                )

            self.assertEqual(access_token, "reauthorized")
            authorize.assert_called_once_with(
                "client", "http://127.0.0.1:8888/callback", path
            )

    def test_updates_an_existing_owned_playlist(self):
        class FakeClient(SpotifyClient):
            def __init__(self):
                self.put_calls = []

            def get(self, path):
                if path == "/me":
                    return {"id": "owner"}
                return {
                    "items": [
                        {
                            "id": "playlist-id",
                            "name": "Weekly",
                            "owner": {"id": "owner"},
                        }
                    ],
                    "next": None,
                }

            def put(self, path, data):
                self.put_calls.append((path, data))
                return {}

        client = FakeClient()
        playlist, created = client.upsert_playlist(
            "Weekly", "Description", ["spotify:track:abc"]
        )

        self.assertFalse(created)
        self.assertEqual(playlist["id"], "playlist-id")
        self.assertEqual(
            client.put_calls,
            [
                (
                    "/playlists/playlist-id/items",
                    {"uris": ["spotify:track:abc"]},
                )
            ],
        )

    def test_creates_and_populates_a_missing_playlist(self):
        class FakeClient(SpotifyClient):
            def __init__(self):
                self.post_calls = []

            def get(self, path):
                if path == "/me":
                    return {"id": "owner"}
                return {"items": [], "next": None}

            def post(self, path, data):
                self.post_calls.append((path, data))
                if path == "/me/playlists":
                    return {"id": "new-playlist"}
                return {}

        client = FakeClient()
        playlist, created = client.upsert_playlist(
            "Weekly", "Description", ["spotify:track:abc"]
        )

        self.assertTrue(created)
        self.assertEqual(playlist["id"], "new-playlist")
        self.assertEqual(
            client.post_calls,
            [
                (
                    "/me/playlists",
                    {
                        "name": "Weekly",
                        "description": "Description",
                        "public": False,
                    },
                ),
                (
                    "/playlists/new-playlist/items",
                    {"uris": ["spotify:track:abc"]},
                ),
            ],
        )


if __name__ == "__main__":
    unittest.main()
