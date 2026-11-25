#!/bin/sh
set -eu

cd "$(dirname "$0")/.."
exec ./node_modules/.bin/ng build \
    --configuration production \
    --output-path docs/christmas-bingo-angular22 \
    --base-href ./
