#!/usr/bin/env bash
set -euo pipefail

IMAGE="ghcr.io/21-ci/website"
TAG="${1:-latest}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"

echo "→ Building $IMAGE:$TAG"

docker buildx build \
  --platform "$PLATFORMS" \
  --tag "$IMAGE:$TAG" \
  --tag "$IMAGE:$(git rev-parse --short HEAD)" \
  --push \
  .

echo "✓ Pushed $IMAGE:$TAG"
