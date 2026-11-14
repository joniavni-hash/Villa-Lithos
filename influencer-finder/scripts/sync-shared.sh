#!/usr/bin/env bash
# Copies the engine into the edge-function shared folder so Deno functions and
# the local test suite run the exact same scoring/discovery code.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf supabase/functions/_shared/engine
mkdir -p supabase/functions/_shared/engine
cp -r src/* supabase/functions/_shared/engine/
echo "synced src → supabase/functions/_shared/engine"
