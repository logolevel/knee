#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/images/content"
FAVICON="$ROOT/src/images/favicon.png"
OUT="$ROOT/public/images"
PUBLIC="$ROOT/public"
TMP="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP"
}
trap cleanup EXIT

mkdir -p "$OUT"

if [[ ! -x "$(command -v sips)" ]]; then
  echo "sips is required to resize images" >&2
  exit 1
fi

if [[ ! -x "$(command -v cwebp)" ]]; then
  echo "cwebp is required to encode WebP" >&2
  exit 1
fi

shopt -s nullglob
sources=("$SRC"/*.jpeg)

if [[ ${#sources[@]} -eq 0 ]]; then
  echo "No jpeg files in $SRC" >&2
  exit 1
fi

for src in "${sources[@]}"; do
  id="$(basename "$src" .jpeg)"

  for width in 640 1280; do
    jpg="$TMP/${id}-${width}.jpg"
    sips --resampleWidth "$width" -s format jpeg -s formatOptions 72 "$src" --out "$jpg" >/dev/null
    cp "$jpg" "$OUT/${id}-${width}.jpg"
    cwebp -quiet -q 72 "$jpg" -o "$OUT/${id}-${width}.webp"
  done
done

if [[ -f "$FAVICON" ]]; then
  sips -z 32 32 "$FAVICON" --out "$PUBLIC/favicon.png" >/dev/null
  sips -z 180 180 "$FAVICON" --out "$PUBLIC/apple-touch-icon.png" >/dev/null
  sips -z 192 192 "$FAVICON" --out "$PUBLIC/icon-192.png" >/dev/null
  sips -z 512 512 "$FAVICON" --out "$PUBLIC/icon-512.png" >/dev/null
fi

echo "Wrote optimized images to $OUT"
ls -lh "$OUT"
echo "Wrote site icons to $PUBLIC"
ls -lh "$PUBLIC"/favicon.png "$PUBLIC"/apple-touch-icon.png "$PUBLIC"/icon-192.png "$PUBLIC"/icon-512.png
