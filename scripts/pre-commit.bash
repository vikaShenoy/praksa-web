#! /usr/bin/env bash

echo "Running pre-commit hook"

# Format
yarn format:fix
# Lint
yarn lint --fix
# Test
yarn test

if [$? -ne 0]; then
  echo 'Tests must pass before commit'
  exit 1
fi