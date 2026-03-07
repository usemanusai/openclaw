#!/bin/bash
# OpenClaw Sovereign Deployment Script
# Targets: Hetzner VPS (100.70.242.51) via Tailscale

set -e

# Configuration
VPS_USER="root"
VPS_HOST="100.70.242.51"
REMOTE_DIR="/root/openclaw"
SSH_KEY_PATH="/mnt/c/Users/Lenovo ThinkPad T480/.augment/ssh-keys/augment_remote_agent_key"

echo "🚀 Starting OpenClaw Deployment to $VPS_HOST..."

# 1. Sync Local Repository with GitHub Fork (Assuming already done by agent)
echo "📦 Ensuring local changes are pushed to fork..."
# git push origin main --force-with-lease (Done by agent)

# 2. Remote Command Execution
echo "💻 Executing remote deployment commands..."

ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" << 'EOF'
    set -e
    cd /root/openclaw || git clone https://github.com/usemanusai/openclaw.git /root/openclaw
    cd /root/openclaw

    echo "🔄 Pulling latest changes from fork..."
    git fetch origin
    git reset --hard origin/main

    echo "🏗️ Building Docker containers (OpenClaw Gateway)..."
    # Ensure OPENCLAW_INSTALL_DOCKER_CLI=1 for sandbox support
    # Use --no-frozen-lockfile to handle synchronized package.json overrides
    docker compose build \
        --build-arg OPENCLAW_INSTALL_DOCKER_CLI=1 \
        --build-arg PNPM_INSTALL_ARGS="--no-frozen-lockfile" \
        openclaw-gateway

    echo "🆙 Starting services..."
    docker compose up -d openclaw-gateway

    echo "🧹 Cleaning up old Docker images..."
    docker image prune -f

    echo "✅ Remote deployment complete!"
EOF

echo "✨ Deployment Finished Successfully!"
