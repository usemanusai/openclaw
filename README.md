> [!NOTE]
> ## 🦞 This is a customized fork with Discord + Google Antigravity Multi-Model Support
>
> **7 Free AI Models**: Gemini 3 Flash/Pro, Claude Sonnet 4.5, Claude Opus 4.5, GPT-OSS
>
> ### ⚡ Quick Start (5 minutes)
>
> **1. Clone & Install**
> ```bash
> git clone https://github.com/usemanusai/openclaw.git
> cd openclaw && pnpm install
> ```
>
> **2. Copy Config**
> ```bash
> # macOS/Linux
> mkdir -p ~/.openclaw && cp openclaw.json.template ~/.openclaw/openclaw.json
>
> # Windows (PowerShell)
> New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.openclaw"
> Copy-Item openclaw.json.template "$env:USERPROFILE\.openclaw\openclaw.json"
> ```
>
> **3. Add Discord Token** - Edit the config and replace `YOUR_DISCORD_BOT_TOKEN_HERE`
>
> **4. Enable Discord Bot Intents** ⚠️ CRITICAL
> - Go to [Discord Developer Portal](https://discord.com/developers/applications) → Your Bot → Bot
> - Enable ALL THREE under "Privileged Gateway Intents":
>   - ✅ PRESENCE INTENT
>   - ✅ SERVER MEMBERS INTENT
>   - ✅ MESSAGE CONTENT INTENT
>
> **5. Authenticate & Run**
> ```bash
> openclaw models auth login --provider google-antigravity
> openclaw gateway run
> ```
>
> 📖 See [FORK-README.md](./FORK-README.md) for full setup guide, troubleshooting, and 50 example prompts.

---

# 🦦 OpenClaw — Personal AI Assistant

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** is a _personal AI assistant_ you run on your own devices.
It answers you on the channels you already use (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat), plus extension channels like BlueBubbles, Matrix, Zalo, and Zalo Personal. It can speak and listen on macOS/iOS/Android, and can render a live Canvas you control. The Gateway is just the control plane — the product is the assistant.

If you want a personal, single-user assistant that feels local, fast, and always-on, this is it.

[Website](https://openclaw.ai) · [Docs](https://docs.openclaw.ai) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [Getting Started](https://docs.openclaw.ai/start/getting-started) · [Updating](https://docs.openclaw.ai/install/updating) · [Showcase](https://docs.openclaw.ai/start/showcase) · [FAQ](https://docs.openclaw.ai/start/faq) · [Wizard](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-clawdbot) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

Preferred setup: run the onboarding wizard (`openclaw onboard`). It walks through gateway, workspace, channels, and skills. The CLI wizard is the recommended path and works on **macOS, Linux, and Windows (via WSL2; strongly recommended)**.
Works with npm, pnpm, or bun.
New install? Start here: [Getting started](https://docs.openclaw.ai/start/getting-started)

**Subscriptions (OAuth):**

- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

Model note: while any model is supported, I strongly recommend **Anthropic Pro/Max (100/200) + Opus 4.5** for long‑context strength and better prompt‑injection resistance. See [Onboarding](https://docs.openclaw.ai/start/onboarding).

## Models (selection + auth)

- Models config + CLI: [Models](https://docs.openclaw.ai/concepts/models)
- Auth profile rotation (OAuth vs API keys) + fallbacks: [Model failover](https://docs.openclaw.ai/concepts/model-failover)

## Install (recommended)

Runtime: **Node ≥22**.

```bash
npm install -g openclaw@latest
# or: pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

The wizard installs the Gateway daemon (launchd/systemd user service) so it stays running.

## Quick start (TL;DR)

Runtime: **Node ≥22**.

Full beginner guide (auth, pairing, channels): [Getting started](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# Send a message
openclaw message send --to +1234567890 --message "Hello from OpenClaw"

# Talk to the assistant (optionally deliver back to any connected channel: WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat)
openclaw agent --message "Ship checklist" --thinking high
```

Upgrading? [Updating guide](https://docs.openclaw.ai/install/updating) (and run `openclaw doctor`).

## Development channels

- **stable**: tagged releases (`vYYYY.M.D` or `vYYYY.M.D-<patch>`), npm dist-tag `latest`.
- **beta**: prerelease tags (`vYYYY.M.D-beta.N`), npm dist-tag `beta` (macOS app may be missing).
- **dev**: moving head of `main`, npm dist-tag `dev` (when published).

Switch channels (git + npm): `openclaw update --channel stable|beta|dev`.
Details: [Development channels](https://docs.openclaw.ai/install/development-channels).

## From source (development)

Prefer `pnpm` for builds from source. Bun is optional for running TypeScript directly.

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # auto-installs UI deps on first run
pnpm build

pnpm openclaw onboard --install-daemon

# Dev loop (auto-reload on TS changes)
pnpm gateway:watch
```

Note: `pnpm openclaw ...` runs TypeScript directly (via `tsx`). `pnpm build` produces `dist/` for running via Node / the packaged `openclaw` binary.

## Security defaults (DM access)

OpenClaw connects to real messaging surfaces. Treat inbound DMs as **untrusted input**.

Full security guide: [Security](https://docs.openclaw.ai/gateway/security)

Default behavior on Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack:

- **DM pairing** (`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`): unknown senders receive a short pairing code and the bot does not process their message.
- Approve with: `openclaw pairing approve <channel> <code>` (then the sender is added to a local allowlist store).
- Public inbound DMs require an explicit opt-in: set `dmPolicy="open"` and include `"*"` in the channel allowlist (`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`).

Run `openclaw doctor` to surface risky/misconfigured DM policies.

## Highlights

- **[Local-first Gateway](https://docs.openclaw.ai/gateway)** — single control plane for sessions, channels, tools, and events.
- **[Multi-channel inbox](https://docs.openclaw.ai/channels)** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, BlueBubbles, Microsoft Teams, Matrix, Zalo, Zalo Personal, WebChat, macOS, iOS/Android.
- **[Multi-agent routing](https://docs.openclaw.ai/gateway/configuration)** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions).
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk Mode](https://docs.openclaw.ai/nodes/talk)** — always-on speech for macOS/iOS/Android with ElevenLabs.
- **[Live Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — agent-driven visual workspace with [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui).
- **[First-class tools](https://docs.openclaw.ai/tools)** — browser, canvas, nodes, cron, sessions, and Discord/Slack actions.
- **[Companion apps](https://docs.openclaw.ai/platforms/macos)** — acOS menu bar app + iOS/Android [nodes](https://docs.openclaw.ai/nodes).
- **[Onboarding](https://docs.openclaw.ai/start/wizard) + [skills](https://docs.openclaw.ai/tools/skills)** — wizard-driven setup with bundled/managed/workspace skills.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## Everything we built so far

### Core platform

- [Gateway WS control plane](https://docs.openclaw.ai/gateway) with sessions, presence, config, cron, webhooks, [Control UI](https://docs.openclaw.ai/web), and [Canvas host](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui).
- [CLI surface](https://docs.openclaw.ai/tools/agent-send): gateway, agent, send, [wizard](https://docs.openclaw.ai/start/wizard), and [doctor](https://docs.openclaw.ai/gateway/doctor).
- [Pi agent runtime](https://docs.openclaw.ai/concepts/agent) in RPC mode with tool streaming and block streaming.
- [Session model](https://docs.openclaw.ai/concepts/session): `main` for direct chats, group isolation, activation modes, queue modes, reply-back. Group rules: [Groups](https://docs.openclaw.ai/concepts/groups).
- [Media pipeline](https://docs.openclaw.ai/nodes/images): images/audio/video, transcription hooks, size caps, temp file lifecycle. Audio details: [Audio](https://docs.openclaw.ai/nodes/audio).

For the full original README, see the [upstream repository](https://github.com/openclaw/openclaw).

---

## 💻 50 Example Prompts for Code Development with Google Antigravity

Use these prompts via Discord DM, @mention, or CLI (`openclaw agent --message "..."`):

### 🏗️ Project Setup & Scaffolding

1. `Create a new Next.js 15 project with TypeScript, Tailwind CSS, and shadcn/ui`
2. `Set up a Python FastAPI project with Poetry, pytest, and Docker support`
3. `Initialize a Rust CLI project with clap for argument parsing`
4. `Create a monorepo structure with pnpm workspaces for frontend, backend, and shared packages`
5. `Scaffold a Chrome extension with Manifest V3, React, and TypeScript`

### 🔧 API Development

6. `Build a REST API endpoint for user authentication with JWT tokens`
7. `Create a GraphQL schema for a blog with posts, comments, and users`
8. `Implement rate limiting middleware for Express.js`
9. `Add WebSocket support for real-time notifications`
10. `Create an OpenAPI/Swagger spec for my existing API endpoints`

### 🗄️ Database & ORM

11. `Set up Prisma with PostgreSQL and create schema for an e-commerce app`
12. `Write a database migration to add soft deletes to all tables`
13. `Create SQLAlchemy models for a multi-tenant SaaS application`
14. `Optimize this SQL query that's taking too long to execute`
15. `Implement database connection pooling with PgBouncer`

### 🧪 Testing

16. `Write unit tests for my React components using Vitest and Testing Library`
17. `Create integration tests for my API endpoints with supertest`
18. `Set up end-to-end tests with Playwright for the login flow`
19. `Add snapshot testing for my UI components`
20. `Generate mock data factories for my database models`

### 🚀 CI/CD & DevOps

21. `Create a GitHub Actions workflow for CI/CD with testing and deployment`
22. `Write a Dockerfile for my Node.js app with multi-stage builds`
23. `Set up Kubernetes manifests for deploying my app with autoscaling`
24. `Create a Terraform config for AWS infrastructure (ECS, RDS, S3)`
25. `Add pre-commit hooks for linting, formatting, and type checking`

### 🛡️ Security

26. `Audit my code for security vulnerabilities and suggest fixes`
27. `Implement CSRF protection for my form submissions`
28. `Add input validation and sanitization to prevent XSS attacks`
29. `Set up OAuth 2.0 authentication with Google and GitHub`
30. `Implement role-based access control (RBAC) for my API`

### ⚡ Performance

31. `Profile and optimize the slow parts of my React app`
32. `Add Redis caching for frequently accessed API responses`
33. `Implement lazy loading and code splitting for my frontend`
34. `Optimize images and assets for faster page loads`
35. `Add database indexes to improve query performance`

### 📝 Documentation

36. `Generate API documentation from my code comments`
37. `Create a README with installation, usage, and contributing guidelines`
38. `Write JSDoc comments for all public functions in this file`
39. `Create an architecture diagram for my application`
40. `Generate a CHANGELOG from my git commit history`

### 🔨 Refactoring

41. `Refactor this class to use dependency injection`
42. `Convert this callback-based code to async/await`
43. `Extract reusable hooks from my React components`
44. `Split this large file into smaller, focused modules`
45. `Apply SOLID principles to this codebase`

### 👨‍💻 Full-Stack Tasks

46. `Build a complete user authentication system with registration, login, and password reset`
47. `Create a file upload system with drag-and-drop, progress bar, and S3 storage`
48. `Implement a real-time chat feature with WebSockets and message persistence`
49. `Build a dashboard with charts, filters, and export-to-CSV functionality`
50. `Create a payment integration with Stripe including subscriptions and webhooks`

---

### 💡 Tips for Best Results

- **Be specific**: Include tech stack, framework versions, and constraints
- **Provide context**: Share relevant code snippets or error messages
- **Use thinking mode**: For complex tasks, add `--thinking high` to the CLI
- **Switch models**: Use `/model claude-opus-4-5-thinking` for complex reasoning tasks
- **Iterate**: Ask follow-up questions to refine the output

### 🔖 Available Models

| Model | Best For |
|-------|----------|
| `google-antigravity/gemini-3-flash` | Fast responses, real-time interactions |
| `google-antigravity/gemini-3-pro` | Complex reasoning, detailed analysis |
| `google-antigravity/gemini-3-pro-thinking` | Deep reasoning with extended thinking |
| `google-antigravity/claude-sonnet-4-5` | Balanced speed/quality |
| `google-antigravity/claude-sonnet-4-5-thinking` | Extended reasoning |
| `google-antigravity/claude-opus-4-5-thinking` | Most capable, complex tasks |
| `google-antigravity/gpt-oss` | OpenAI's open-source model |
