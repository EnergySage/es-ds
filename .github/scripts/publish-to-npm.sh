#!/usr/bin/env bash
# Publishes the package in the current directory unless npm already has its package.json version,
# so re-running a release job whose publish succeeded but whose later steps failed picks up where it left off.
set -euo pipefail

name=$(jq -r .name package.json)
version=$(jq -r .version package.json)

published=$(npm view "$name@$version" version --prefer-online --registry https://registry.npmjs.org/ 2>/dev/null || true)
if [[ "$published" == "$version" ]]; then
    echo "$name@$version is already on npm, skipping publish"
    exit 0
fi

npm publish
