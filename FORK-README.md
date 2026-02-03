# 🦞 OpenClaw Fork - Discord + Google Antigravity Multi-Model

> **This is a customized fork of [OpenClaw](https://github.com/openclaw/openclaw)** with pre-configured Discord integration and Google Antigravity multi-model support.

## ✨ Fork Features

- **Multi-Model Support**: Access to 7 frontier AI models via Google Antigravity
- **Primary Model**: `google-antigravity/gemini-3-flash` (fast, efficient)
- **Fallback Models**: Gemini 3 Pro → Claude Sonnet 4.5
- **Discord Control**: Full Discord action support (messages, reactions, threads, polls, etc.)
- **Free Google Search**: Keyless search using Google Antigravity Auth plugin

## 🤖 Available Models

All models are available through Google Antigravity at **no additional cost** (with Antigravity Pro subscription):

| Model | Alias | Best For |
|-------|-------|----------|
| `google-antigravity/gemini-3-flash` | Gemini 3 Flash | Fast responses, UI generation, real-time interactions |
| `google-antigravity/gemini-3-pro` | Gemini 3 Pro | Complex reasoning, code generation, detailed analysis |
| `google-antigravity/gemini-3-pro-thinking` | Gemini 3 Pro (Thinking) | Deep reasoning with extended thinking |
| `google-antigravity/claude-sonnet-4-5` | Claude Sonnet 4.5 | Balanced speed/quality, concise responses |
| `google-antigravity/claude-sonnet-4-5-thinking` | Claude Sonnet 4.5 (Thinking) | Extended reasoning with Claude |
| `google-antigravity/claude-opus-4-5-thinking` | Claude Opus 4.5 (Thinking) | Most capable Claude model, complex tasks |
| `google-antigravity/gpt-oss` | GPT-OSS | OpenAI's open-source model (GPT-OSS-120B) |

## 🎮 Discord Control Capabilities

Send commands to your OpenClaw bot via Discord:

- **Search the web**: AI-powered answers with Google Search
- **Send messages**: Control Discord channels programmatically
- **React to messages**: Add reactions to any message
- **Create polls**: Run polls in channels
- **Manage threads**: Create and reply to threads
- **Pin messages**: Pin important messages
- **And more**: Member info, role info, channel info, voice status, events

### Example Commands (via Discord DM or mention)

```
"Search for the latest news about AI"
"Send a message to #general saying hello"
"Create a poll in #team asking about lunch options"
"React with 👍 to the last message in #announcements"
```

## 🚀 Quick Start (This Fork)

### 1. Clone & Install

```bash
git clone https://github.com/usemanusai/openclaw.git
cd openclaw
pnpm install
```

### 2. Configure

```bash
cp openclaw.json.template ~/.openclaw/openclaw.json
```

Edit `~/.openclaw/openclaw.json` and add your bot tokens:
- **Discord**: Update `channels.discord.token`
- **Telegram** (optional): Update `channels.telegram.botToken`

### 3. Authenticate with Google Antigravity

```bash
openclaw models auth login --provider google-antigravity
```

### 4. Run the Gateway

```bash
openclaw gateway run
```

## 🔧 Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application and add a Bot
3. Enable **Privileged Gateway Intents**:
   - `MESSAGE CONTENT INTENT`
   - `SERVER MEMBERS INTENT` (optional)
4. Copy the bot token to `channels.discord.token`
5. Invite the bot with these permissions:
   - Send Messages, Read Message History, Add Reactions
   - Manage Messages (for pins), Create Public Threads
   - Send Messages in Threads, Use External Emojis

## 💰 Cost

**$0** - This setup uses Google Antigravity which is available in free public preview. All 7 models and Google Search are included with generous rate limits.

---

**For full documentation, see the original [OpenClaw README](./README.md) below.**
