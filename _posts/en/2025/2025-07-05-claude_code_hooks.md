---
title: How to Send Telegram Notifications with Claude Code Hooks - Never Miss AI Task Completion Again!
date: 2025-07-05 15:00:00 +0800
categories: ["Tech Sharing"]
tags: ["2025", "AI", "Claude Code"]
author: Jimmy
description: Quick start guide to Claude Code Hooks for building your own automated task monitoring workflow
lang: en
page_id: claude_code_hooks
---

# Introduction to Claude Code Hooks
Claude Code Hooks is an event-driven automation mechanism that allows you to automatically execute shell commands you specify before or after Claude Code performs certain operations.

When using Claude Code, you often want to complete some custom tasks after finishing specific operations, then continue with subsequent tasks.

While this can all be handled by giving the model good enough prompts before starting a session, sometimes we want these custom tasks to be rigorous enough that they don't rely on LLM decision-making. This is where Claude Code Hooks comes in handy.

---

# Common Use Cases for Claude Code Hooks:

| Feature | Description |
|---------|-------------|
| Notifications | Customize how you're alerted when Claude Code is waiting for your input or approval |
| Auto-formatting | Automatically run prettier after every file edit |
| Logging | Track and analyze all executed commands for auditing or debugging |
| Auto-feedback | Automatically provide guidance when Claude Code generates code that doesn't follow library standards |
| Custom Permissions | Block modifications to production files or sensitive directories |

---

Claude Code Hooks' event-driven system includes scenarios like **PreToolUse**, **PostToolUse**, **Notification**, **Stop**, **SubagentStop**, and more.

Users can customize which scenarios trigger hooks.

For example:

In PostToolUse scenarios, when **Claude Code** executes Write, Edit, or MultiEdit operations, it will trigger the corresponding hooks.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```
---

# How to Send Telegram Notifications with Claude Code Hooks

Let's create a simple example where Claude Code automatically sends Telegram notifications when it's waiting for your approval.

First, let's write a simple shell script that will send Telegram notifications.

```bash
#!/bin/bash

# Script for sending Telegram notifications
TELEGRAM_SCRIPT="/home/jimmy/script/telegram-notify.sh"

# I want the notifications to look a bit nicer, so I'm writing a format_notification function to handle the notification format
format_notification() {
    local hook_data="$1"
    
    # Check if jq is available
    if ! command -v jq >/dev/null 2>&1; then
        echo "🤖 Claude Notification
💬 jq not available - raw notification" | "$TELEGRAM_SCRIPT"
        return 0
    fi
    
    # Extract message and hook_event_name from hook input data
    local message
    local hook_event_name
    
    message=$(echo "$hook_data" | jq -r '.message // "No message"' 2>/dev/null)
    hook_event_name=$(echo "$hook_data" | jq -r '.hook_event_name // "Unknown"' 2>/dev/null)
    

    local formatted_message="🤖 <b>Claude Notification</b>
💬 $message"
    
    # Send Telegram notification
    echo "$formatted_message" | "$TELEGRAM_SCRIPT"
    
    return $?
}

```
Next, let's configure hooks in Claude Code. Enter the Claude Code CLI interface and use **/hooks** to access the hooks configuration interface. You'll see the following screen:
![Claude Code Hooks interface](/img/posts/claude_code_hooks.webp)

Go to the Notification field and Add new hook, input the path to the shell script we just wrote, and also adjust whether this hook is for project settings or global user settings.
At this point, your settings.json will show your hooks configuration as follows:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "/home/jimmy/script/claude-notification-message.sh"
          }
        ]
      }
    ]
  }
}
```

Now we can start testing! I often switch to other windows while Claude Code is running.

I frequently encounter situations where Claude Code is waiting for my approval, but I don't notice. This is when this feature comes in handy to remind me.

Here's an example of asking Claude Code to execute a Bash command to create a folder:

When it triggers a Notification, it will automatically send a Telegram notification to me.

I'll never forget that I've asked Claude Code to do something again! 😂


![Claude Code Hooks demo](/img/posts/claude_code_hooks_demo_2.webp)

---

# Conclusion
When setting up Claude Code Hooks, you can also use Hook Output to determine the corresponding logic for successful and failed hook execution, using Exit Code or Json Output to decide.
Additionally, matchers can be configured for MCP tool usage scenarios, making it convenient to execute planned hooks when specific MCP tools are triggered. By establishing comprehensive hooks, you can make
Claude Code usage more rigorous and reduce the time spent checking for errors afterward.

# References

[Claude Code Hooks Official Documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)
