#!/usr/bin/env bash
# Regenerate public/og.png from scripts/og-card.html (1200×630).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
HTML="file://${ROOT}/scripts/og-card.html"
OUT="${ROOT}/public/og.png"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME" >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot="$OUT" \
  "$HTML"

echo "Wrote $OUT"
file "$OUT"
