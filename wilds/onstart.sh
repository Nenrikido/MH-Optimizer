#!/usr/bin/env bash
set -euo pipefail

# Load nvm
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Node: $(node -v)"
echo "npm: $(npm -v)"

cd /root/MHOpti/wilds/frontend

# Only install dependencies if package-lock.json is newer than node_modules
if [ ! -d "node_modules" ] || [ "package-lock.json" -nt "node_modules" ]; then
  echo "Dependencies changed or missing, running npm ci..."
  npm ci
else
  echo "Dependencies up to date, skipping npm ci"
fi

npm run build_prod
