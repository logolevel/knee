#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/images"
OUT="$ROOT/public/images"
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

for src in "$SRC"/*.jpeg; do
  id="$(basename "$src" .jpeg)"

  for width in 640 1280; do
    jpg="$TMP/${id}-${width}.jpg"
    sips --resampleWidth "$width" -s format jpeg -s formatOptions 72 "$src" --out "$jpg" >/dev/null
    cp "$jpg" "$OUT/${id}-${width}.jpg"
    cwebp -quiet -q 72 "$jpg" -o "$OUT/${id}-${width}.webp"
  done
done

echo "Wrote optimized images to $OUT"
ls -lh "$OUT"
