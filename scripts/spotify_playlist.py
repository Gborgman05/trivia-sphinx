#!/usr/bin/env python3
"""Create or refresh a Spotify playlist from a weekly trivia CSV."""

import argparse
import base64
import csv
import hashlib
import http.server
import json
import os
import re
import secrets
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from pathlib import Path


AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE = "https://api.spotify.com/v1"
DEFAULT_REDIRECT_URI = "http://127.0.0.1:8888/callback"
SCOPES = "playlist-read-private playlist-modify-private playlist-modify-public"
TRACK_URL_PATTERN = re.compile(
    r"^https://open\.spotify\.com/track/([A-Za-z0-9]+)(?:[?#].*)?$"
)
CSV_NAME_PATTERN = re.compile(
    r"^trivia-(\d{4}-\d{2}-\d{2})-juanita-cantina\.csv$"
)


def build_playlist_name(event_date):
    return f"Beat the Geek — Juanita Cantina — {event_date}"


def pkce_challenge(verifier):
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")


def load_track_uris(csv_path):
    csv_path = Path(csv_path)
    match = CSV_NAME_PATTERN.fullmatch(csv_path.name)
    if not match:
        raise ValueError(
            "CSV filename must match trivia-YYYY-MM-DD-juanita-cantina.csv"
        )

    with csv_path.open(newline="", encoding="utf-8") as source:
        reader = csv.DictReader(source)
        if "round" not in (reader.fieldnames or []) or "spotify_url" not in (
            reader.fieldnames or []
        ):
            raise ValueError("CSV must contain round and spotify_url columns")
        music_rows = [row for row in reader if row["round"] == "4"]

    uris = []
    for row in music_rows:
        url_match = TRACK_URL_PATTERN.fullmatch(row["spotify_url"].strip())
        if not url_match:
            raise ValueError(f"Invalid Spotify track URL: {row['spotify_url']}")
        uris.append(f"spotify:track:{url_match.group(1)}")

    if not uris:
        raise ValueError("CSV has no round 4 Spotify tracks")
    if len(uris) != len(set(uris)):
        raise ValueError("CSV contains duplicate Spotify tracks")
    return match.group(1), uris


def request_json(url, *, method="GET", headers=None, data=None):
    encoded = None
    request_headers = dict(headers or {})
    if data is not None:
        encoded = json.dumps(data).encode("utf-8")
        request_headers["Content-Type"] = "application/json"

    request = urllib.request.Request(
        url, data=encoded, headers=request_headers, method=method
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Spotify request failed ({error.code} {error.reason}): {detail}"
        ) from error


def post_form(url, fields):
    encoded = urllib.parse.urlencode(fields).encode("ascii")
    request = urllib.request.Request(
        url,
        data=encoded,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Spotify token request failed ({error.code} {error.reason}): {detail}"
        ) from error


def save_token(path, token, previous=None):
    token = dict(token)
    if "refresh_token" not in token and previous and previous.get("refresh_token"):
        token["refresh_token"] = previous["refresh_token"]
    token["expires_at"] = int(time.time()) + int(token.get("expires_in", 3600))
    descriptor = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    os.fchmod(descriptor, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as destination:
        destination.write(json.dumps(token, indent=2) + "\n")
    return token


def refresh_access_token(client_id, token, cache_path):
    refreshed = post_form(
        TOKEN_URL,
        {
            "grant_type": "refresh_token",
            "refresh_token": token["refresh_token"],
            "client_id": client_id,
        },
    )
    return save_token(cache_path, refreshed, previous=token)


def authorize(client_id, redirect_uri, cache_path):
    parsed_redirect = urllib.parse.urlparse(redirect_uri)
    if parsed_redirect.scheme != "http" or parsed_redirect.hostname not in {
        "127.0.0.1",
        "::1",
    }:
        raise ValueError("Redirect URI must use an HTTP loopback IP address")
    if not parsed_redirect.port:
        raise ValueError("Redirect URI must include a port")

    verifier = secrets.token_urlsafe(64)
    state = secrets.token_urlsafe(24)
    result = {}

    class CallbackHandler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            if query.get("state", [None])[0] != state:
                result["error"] = "OAuth state mismatch"
                status = 400
            elif "error" in query:
                result["error"] = query["error"][0]
                status = 400
            else:
                result["code"] = query.get("code", [None])[0]
                status = 200

            message = (
                "Spotify authorization complete. You can close this tab."
                if status == 200
                else f"Spotify authorization failed: {result['error']}"
            )
            body = message.encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, _format, *_args):
            pass

    params = {
        "client_id": client_id,
        "response_type": "code",
        "redirect_uri": redirect_uri,
        "scope": SCOPES,
        "state": state,
        "code_challenge_method": "S256",
        "code_challenge": pkce_challenge(verifier),
    }
    authorization_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    server_class = (
        http.server.ThreadingHTTPServer
        if parsed_redirect.hostname == "127.0.0.1"
        else http.server.HTTPServer
    )
    with server_class(
        (parsed_redirect.hostname, parsed_redirect.port), CallbackHandler
    ) as server:
        print("Opening Spotify authorization in your browser.")
        print(f"If it does not open, visit:\n{authorization_url}")
        webbrowser.open(authorization_url)
        server.timeout = 300
        server.handle_request()

    if result.get("error"):
        raise RuntimeError(result["error"])
    if not result.get("code"):
        raise RuntimeError("Timed out waiting for Spotify authorization")

    token = post_form(
        TOKEN_URL,
        {
            "grant_type": "authorization_code",
            "code": result["code"],
            "redirect_uri": redirect_uri,
            "client_id": client_id,
            "code_verifier": verifier,
        },
    )
    return save_token(cache_path, token)


def get_access_token(client_id, redirect_uri, cache_path):
    if cache_path.exists():
        token = json.loads(cache_path.read_text(encoding="utf-8"))
        if token.get("access_token") and token.get("expires_at", 0) > time.time() + 60:
            return token["access_token"]
        if token.get("refresh_token"):
            try:
                return refresh_access_token(client_id, token, cache_path)["access_token"]
            except RuntimeError as error:
                if "invalid_grant" not in str(error):
                    raise
                cache_path.unlink(missing_ok=True)
                print("Spotify authorization expired; opening a fresh login.")
    return authorize(client_id, redirect_uri, cache_path)["access_token"]


class SpotifyClient:
    def __init__(self, access_token):
        self.headers = {"Authorization": f"Bearer {access_token}"}

    def get(self, path):
        return request_json(f"{API_BASE}{path}", headers=self.headers)

    def post(self, path, data):
        return request_json(
            f"{API_BASE}{path}", method="POST", headers=self.headers, data=data
        )

    def put(self, path, data):
        return request_json(
            f"{API_BASE}{path}", method="PUT", headers=self.headers, data=data
        )

    def find_owned_playlist(self, name, owner_id):
        path = "/me/playlists?limit=50"
        while path:
            page = self.get(path)
            for playlist in page.get("items", []):
                if (
                    playlist.get("name") == name
                    and playlist.get("owner", {}).get("id") == owner_id
                ):
                    return playlist
            next_url = page.get("next")
            path = next_url.removeprefix(API_BASE) if next_url else None
        return None

    def upsert_playlist(self, name, description, uris, public=False):
        user = self.get("/me")
        playlist = self.find_owned_playlist(name, user["id"])
        if playlist:
            self.put(f"/playlists/{playlist['id']}/items", {"uris": uris})
            return playlist, False

        playlist = self.post(
            "/me/playlists",
            {"name": name, "description": description, "public": public},
        )
        self.post(f"/playlists/{playlist['id']}/items", {"uris": uris})
        return playlist, True


def latest_csv(root):
    matches = sorted(root.glob("trivia-????-??-??-juanita-cantina.csv"))
    if not matches:
        raise ValueError("No weekly trivia CSV found")
    return matches[-1]


def parse_args(argv=None):
    parser = argparse.ArgumentParser(
        description="Create or refresh a Spotify playlist from a trivia CSV."
    )
    parser.add_argument(
        "csv",
        nargs="?",
        type=Path,
        help="Weekly CSV (defaults to the newest trivia CSV in the repository)",
    )
    parser.add_argument("--public", action="store_true", help="Create a public playlist")
    parser.add_argument("--name", help="Override the generated playlist name")
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    root = Path(__file__).resolve().parents[1]
    csv_path = args.csv or latest_csv(root)
    if not csv_path.is_absolute():
        csv_path = Path.cwd() / csv_path

    client_id = os.environ.get("SPOTIFY_CLIENT_ID")
    if not client_id:
        raise SystemExit("Set SPOTIFY_CLIENT_ID to your Spotify app's Client ID.")

    redirect_uri = os.environ.get("SPOTIFY_REDIRECT_URI", DEFAULT_REDIRECT_URI)
    cache_path = root / ".spotify-token.json"
    event_date, uris = load_track_uris(csv_path)
    playlist_name = args.name or build_playlist_name(event_date)
    description = (
        f"Beat the Geek study playlist for Juanita Cantina on {event_date}."
    )

    access_token = get_access_token(client_id, redirect_uri, cache_path)
    playlist, created = SpotifyClient(access_token).upsert_playlist(
        playlist_name, description, uris, public=args.public
    )
    action = "Created" if created else "Updated"
    url = playlist.get("external_urls", {}).get(
        "spotify", f"https://open.spotify.com/playlist/{playlist['id']}"
    )
    print(f"{action} {playlist_name}\n{url}")


if __name__ == "__main__":
    try:
        main()
    except (OSError, RuntimeError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        raise SystemExit(1)
