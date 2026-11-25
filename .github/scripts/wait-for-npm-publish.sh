#!/usr/bin/env bash
# Polls the public registry until the package in the current directory is installable at its
# package.json version. The packument can list a version before its tarball is served.
# npm's post-publish processing can take well over five minutes, so the default limit is 15 minutes.
set -euo pipefail

name=$(jq -r .name package.json)
version=$(jq -r .version package.json)
attempts=${ATTEMPTS:-90}
interval=${INTERVAL:-10}

for ((i = 1; i <= attempts; i++)); do
    tarball=$(npm view "$name@$version" dist.tarball --prefer-online --registry https://registry.npmjs.org/ 2>/dev/null || true)
    if [[ -z "$tarball" ]]; then
        reason="registry does not list the version yet"
    else
        status=$(curl -sIL -o /dev/null -w '%{http_code}' "$tarball" || true)
        if [[ "$status" == "200" ]]; then
            echo "$name@$version is available: $tarball"
            exit 0
        fi
        reason="tarball returned HTTP $status"
    fi
    echo "Waiting for $name@$version ($i/$attempts): $reason"
    sleep "$interval"
done

echo "::error::$name@$version was not available on npm after $((attempts * interval))s"
exit 1
