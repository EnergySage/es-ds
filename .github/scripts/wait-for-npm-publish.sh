#!/usr/bin/env bash
# Polls the public registry until the package in the current directory is installable at its
# package.json version. The packument can list a version before its tarball is served.
set -euo pipefail

name=$(jq -r .name package.json)
version=$(jq -r .version package.json)
attempts=${ATTEMPTS:-30}
interval=${INTERVAL:-10}

for ((i = 1; i <= attempts; i++)); do
    tarball=$(npm view "$name@$version" dist.tarball --prefer-online --registry https://registry.npmjs.org/ 2>/dev/null || true)
    if [[ -n "$tarball" ]] && curl -fsIL -o /dev/null "$tarball"; then
        echo "$name@$version is available: $tarball"
        exit 0
    fi
    echo "Waiting for $name@$version ($i/$attempts)..."
    sleep "$interval"
done

echo "::error::$name@$version was not available on npm after $((attempts * interval))s"
exit 1
