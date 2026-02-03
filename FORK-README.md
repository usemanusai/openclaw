# 🦞 OpenClaw Fork - Discord + Google Antigravity Multi-Model

> **This is a customized fork of [OpenClaw](https://github.com/openclaw/openclaw)** with pre-configured Discord integration and Google Antigravity multi-model support.

## ✨ Fork Features

- **Multi-Model Support**: Access to 7 frontier AI models via Google Antigravity
- **Primary Model**: `google-antigravity/gemini-3-flash` (fast, efficient)
- **Fallback Models**: Gemini 3 Pro → Claude Sonnet 4.5
- **Discord Control**: Full Discord action support (messages, reactions, threads, polls, etc.)
- **Free Google Search**: Keyless search using Google Antigravity Auth plugin

## 🔖 Available Models

All models are available through Google Antigravity at **no additional cost** (free public preview):

| Model | Alias | Best For |
|-------|-------|----------|
| `google-antigravity/gemini-3-flash` | Gemini 3 Flash | Fast responses, UI generation, real-time interactions |
| `google-antigravity/gemini-3-pro` | Gemini 3 Pro | Complex reasoning, code generation, detailed analysis |
| `google-antigravity/gemini-3-pro-thinking` | Gemini 3 Pro (Thinking) | Deep reasoning with extended thinking |
| `google-antigravity/claude-sonnet-4-5` | Claude Sonnet 4.5 | Balanced speed/quality, concise responses |
| `google-antigravity/claude-sonnet-4-5-thinking` | Claude Sonnet 4.5 (Thinking) | Extended reasoning with Claude |
| `google-antigravity/claude-opus-4-5-thinking` | Claude Opus 4.5 (Thinking) | Most capable Claude model, complex tasks |
| `google-antigravity/gpt-oss` | GPT-OSS | OpenAI's open-source model (GPT-OSS-120B) |

## 🚀 Quick Start

### Step 1: Clone & Install

```bash
git clone https://github.com/usemanusai/openclaw.git
cd openclaw
pnpm install
```

### Step 2: Copy Config Template

**Linux/macOS:**
```bash
mkdir -p ~/.openclaw
cp openclaw.json.template ~/.openclaw/openclaw.json
```

**Windows (Cmd):**
```cmd
mkdir %USERPROFILE%\.openclaw
copy openclaw.json.template %USERPROFILE%\.openclaw\openclaw.json
```

### Step 3: Add Your Discord Bot Token

Edit `~/.openclaw/openclaw.json` and replace `YOUR_DISCORD_BOT_TOKEN_HERE` with your actual Discord bot token.

### Step 4: Validate Config (Important!)

```bash
openclaw doctor --fix
```

This checks your config and fixes any issues. If you see "Invalid config" errors, this command will resolve them.

### Step 5: Authenticate with Google Antigravity

```bash
openclaw models auth login --provider google-antigravity
```

This opens a browser for OAuth login. Once complete, you'll have access to all 7 models.

### Step 6: Run the Gateway

```bash
openclaw gateway run
```

You should see:
```
[discord] logged in to discord as <YOUR_BOT_ID>
```

## 📋 Full Config (Copy-Paste Ready)

**Replace `YOUR_DISCORD_BOT_TOKEN_HERE` with your actual Discord bot token!**

Save this to:
- **Windows**: `%USERPROFILE%\.openclaw\openclaw.json`
- **macOS/Linux**: `~/.openclaw/openclaw.json`

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.30"
  },
  "auth": {
    "profiles": {}
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "google-antigravity/gemini-3-flash",
        "fallbacks": [
          "google-antigravity/gemini-3-pro",
          "google-antigravity/claude-sonnet-4-5"
        ]
      },
      "models": {
        "google-antigravity/gemini-3-pro": {
          "alias": "Gemini 3 Pro"
        },
        "google-antigravity/gemini-3-pro-thinking": {
          "alias": "Gemini 3 Pro (Thinking)"
        },
        "google-antigravity/gemini-3-flash": {
          "alias": "Gemini 3 Flash"
        },
        "google-antigravity/claude-sonnet-4-5": {
          "alias": "Claude Sonnet 4.5"
        },
        "google-antigravity/claude-sonnet-4-5-thinking": {
          "alias": "Claude Sonnet 4.5 (Thinking)"
        },
        "google-antigravity/claude-opus-4-5-thinking": {
          "alias": "Claude Opus 4.5 (Thinking)"
        },
        "google-antigravity/gpt-oss": {
          "alias": "GPT-OSS"
        }
      },
      "workspace": "./clawd",
      "compaction": {
        "mode": "safeguard"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": false
    },
    "discord": {
      "enabled": true,
      "token": "YOUR_DISCORD_BOT_TOKEN_HERE",
      "dm": {
        "policy": "open",
        "allowFrom": ["*"]
      },
      "groupPolicy": "open",
      "mentionPolicy": "always",
      "guilds": {
        "*": {
          "policy": "open"
        }
      },
      "actions": {
        "reactions": true,
        "messages": true,
        "threads": true,
        "pins": true,
        "search": true,
        "polls": true,
        "permissions": true,
        "memberInfo": true,
        "roleInfo": true,
        "channelInfo": true,
        "voiceStatus": true,
        "events": true,
        "stickers": true,
        "emojiUploads": false,
        "stickerUploads": false,
        "roles": false,
        "channels": false,
        "moderation": false
      }
    }
  },
  "skills": {
    "entries": {
      "discord": {
        "enabled": true
      },
      "gemini": {
        "enabled": true
      }
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": "none"
  },
  "plugins": {
    "entries": {
      "google-antigravity-auth": {
        "enabled": true
      },
      "telegram": {
        "enabled": false
      },
      "discord": {
        "enabled": true
      }
    }
  }
}
```

---

## 🛠️ Troubleshooting

### Discord Error 4014 (Disallowed Intents)

If you see `Fatal Gateway error: 4014`, you need to enable Discord bot intents:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your bot → **Bot** section
3. Scroll to **Privileged Gateway Intents**
4. Enable ALL THREE:
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT
5. Click **Save Changes**
6. Restart the gateway

### Windows PowerShell Command Errors

On Windows, you may see errors like:
```
The token '&&' is not a valid statement separator in this version.
```

This happens when the AI generates bash-style commands. The bot will usually retry with correct PowerShell syntax. You can also:
- Tell the bot: "Use PowerShell syntax, not bash"
- The bot learns from errors and will adapt

### "Invalid config" or "Unrecognized key" errors

If you see errors like:
```
Invalid config at ...\openclaw.json:
- agents.defaults: Unrecognized key: "tools"
```

Run this command to automatically fix the config:
```bash
openclaw doctor --fix
```

### Windows Users - Creating the Config Directory

**PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.openclaw"
```

**Command Prompt:**
```cmd
mkdir %USERPROFILE%\.openclaw
```

Then create `openclaw.json` in that folder with the config above.

---

## 🔧 Discord Bot Setup (Required)

### 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Give it a name (e.g., "My OpenClaw Bot")
4. Click **Create**

### 2. Create a Bot

1. Go to the **Bot** section in the left sidebar
2. Click **Add Bot**
3. Click **Reset Token** and copy the token
4. Save this token - you'll need it for the config

### 3. Enable Privileged Gateway Intents ⚠️ CRITICAL

Scroll down to **Privileged Gateway Intents** and enable **ALL THREE**:

- ✅ **PRESENCE INTENT**
- ✅ **SERVER MEMBERS INTENT**
- ✅ **MESSAGE CONTENT INTENT** ← This one is required!

Click **Save Changes**

### 4. Invite the Bot to Your Server

1. Go to **OAuth2** > **URL Generator**
2. Select scopes: `bot`, `applications.commands`
3. Select bot permissions:
   - Send Messages
   - Read Message History
   - Add Reactions
   - Manage Messages (for pins)
   - Create Public Threads
   - Send Messages in Threads
   - Use External Emojis
4. Copy the generated URL and open it in your browser
5. Select your server and click **Authorize**

## 🎮 Discord Control Capabilities

Send commands to your OpenClaw bot via Discord DM or @mention:

- **Search the web**: AI-powered answers with Google Search
- **Send messages**: Control Discord channels programmatically
- **React to messages**: Add reactions to any message
- |**Create polls**: Run polls in channels
- **Manage threads**: Create and reply to threads
- **Pin messages**: Pin important messages
- **And more**: Member info, role info, channel info, voice status, events

## 💰 Cost

**$0** - This setup uses Google Antigravity which is available in free public preview. All 7 models and Google Search are included with generous rate limits.

---

## 💻 50 Example Prompts for Code Development Agent

Use these prompts via Discord DM, @mention, or the CLI (`openclaw agent --message "..."`):

### 🏗 Project Setup & Scaffolding

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

### ⚡️ Performance

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
4. `Apply SOLID principles to this codebase`

### 👤‍💻 Full-Stack Tasks

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
- **Iterate**: Ask follow-up questions to refine the output

---

**For full documentation, see the original [OpenClaw README](./README.md).**