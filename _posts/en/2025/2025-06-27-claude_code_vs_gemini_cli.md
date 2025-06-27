---
title: Claude Code vs Gemini CLI — Should You Switch to Gemini CLI?
date: 2025-06-27 13:00:00 +0800
categories: ["Tech"]
tags: ["2025", "AI", "Claude Code", "Gemini CLI"]
author: Jimmy
description: Comparing Claude Code and Gemini CLI to help you decide whether to make the switch to Gemini CLI
lang: en
page_id: claude_code_vs_gemini_cli
image:
  path: /img/posts/Gemini_CLI_Hero_Final.webp
  no_bg: true
---

# The Launch of Google CLI

On June 26, 2025, Google officially launched Gemini CLI, stepping into the competitive field of AI agent CLIs. Developers can now sign in with their personal Google accounts and use Gemini CLI for free, with access to Gemini 2.5 Pro and a context window of up to 100 tokens.

The tool offers 60 requests per minute and up to 1,000 model runs per day, all completely free of charge.

---

# Claude Code vs Gemini CLI

At first glance, Gemini CLI feels very similar to Claude Code — both support non-interactive usage and integrate with MCP. However, Gemini CLI stands out with built-in support for Google Search and WebFetch, and adds memory management via `--checkpoint`, along with a sandbox mode `-s` to prevent local environment contamination.


| Feature                | **Claude Code**                              | **Gemini CLI**                                                              |
| ---------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| **Installation**       | `npm install -g @anthropic-ai/claude-code`   | `npm install -g @google/gemini-cli`                                         |
| **MCP Support**        | ✅                                            | ✅                                                                           |
| **Telemetry**          | ✅                                            | ✅                                                                           |
| **Memory Management**  | Uses `CLAUDE.md` for memory management       | Supports `--checkpointing` to save and restore conversation & file state    |
| **Security**           | Permissions configurable via `settings.json` | Uses `-s` flag to sandbox commands and prevent unwanted system changes      |
| **Usage Requirements** | Requires Claude Pro subscription             | Free with Google account; 60 model requests/min, 1,000 daily limit         |

---

# Getting Started with Gemini CLI

**Install Gemini CLI**:
   ```bash
   npm install -g @google/gemini-cli
   ```
Once the installation is successful, you will see the following message:

![Installation Successful](/img/posts/gemini_cli.webp)

Now you can start using Gemini CLI. Here are some basic commands to get you started:

**Check Token Usage**
```bash
/stats
```
**List Available Tools**
```bash
/tools
```
**Run a prompt without interactive mode**
```bash
gemini -p "Your prompt"
```
---

# Will Claude Code Lose Its Crown?

For now, Claude Code still holds a strong position — especially with its integration across platforms and Claude 4's outstanding capabilities in code reasoning. However, Gemini CLI is a solid alternative for those who prefer not to pay for premium access. With its open-source nature and free availability, it may well shift the competitive landscape.
