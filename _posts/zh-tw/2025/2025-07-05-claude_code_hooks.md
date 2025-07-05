---
title: 如何用 Claude Code Hooks 寄送 Telegram 通知，再也不用等待 AI 完成任務！
date: 2025-07-05 15:00:00 +0800
categories: ["技術分享"]
tags: ["2025", "AI", "Claude Code"]
author: Jimmy
description: 快速入門 Claude Code Hooks 打造屬於你的自動任務監控流程
lang: zh-tw
page_id: claude_code_hooks
---

# Claude Code Hooks 介紹
Claude Code Hooks 是一種 事件驅動的自動化機制，允許你在 Claude Code 執行某些操作之前或之後，自動執行你指定的 shell 命令。

在使用 Claude code時，常常會希望執行完特定任務時，可以先完成某個使用者自訂的任務，再繼續延續執行後續的任務。

雖然這都可以在開啟session前用足夠好的prompt要求model執行，但有時候我們希望這些自訂任務可以足夠嚴謹，不仰賴LLM來做決定，這就是Claude Code Hooks 的用武之地。

---

# Claude Code Hooks 常見的使用情境分為以下幾種：

| 功能項目   | 說明                                                         |
|------------|--------------------------------------------------------------|
| 通知       | 自訂當 Claude Code 等待你的輸入或執行許可時的提醒方式       |
| 自動格式化 | 每次編輯檔案後，自動執行 prettier                            |
| 日誌記錄   | 追蹤並統計所有執行過的指令，方便稽核或除錯                  |
| 自動回饋   | 當 Claude Code 產生不符合程式庫規範的程式碼時，自動提供指導 |
| 自訂權限   | 阻擋對生產環境檔案或敏感目錄的修改行為                       |

---

Claude Code Hooks 的事件驅動分為 **PreToolUse**、**PostToolUse**、**Notification**、**Stop**、**SubagentStop** 等等情境

使用者可以調整決定什麼情境才要驅動hooks

舉例:

在PostToolUse的情境下，當 **Claude Code** 執行了Write、Edit或MultiEdit等操作時，就會觸發相對應的hooks。

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

# 如何使用 Claude Code Hooks 寄送 Telegram 通知

接下來開始時做一個簡單的範例，當 Claude Code 執行需要等待你的輸入時，會自動寄送 Telegram 通知。

首先先寫一隻簡單的 shell script，這個 script 會寄送 Telegram 通知。

```bash
#!/bin/bash

# 寄送 Telegram 通知的腳本
TELEGRAM_SCRIPT="/home/jimmy/script/telegram-notify.sh"

# 因為我希望寄送的通知可以稍微美觀點，所以另外寫一個format_notification 函式來處理通知格式
format_notification() {
    local hook_data="$1"
    
    # Check if jq is available
    if ! command -v jq >/dev/null 2>&1; then
        echo "🤖 Claude Notification
💬 jq not available - raw notification" | "$TELEGRAM_SCRIPT"
        return 0
    fi
    
    # 抓取hook input 訊息中的 message 和 hook_event_name
    local message
    local hook_event_name
    
    message=$(echo "$hook_data" | jq -r '.message // "No message"' 2>/dev/null)
    hook_event_name=$(echo "$hook_data" | jq -r '.hook_event_name // "Unknown"' 2>/dev/null)
    

    local formatted_message="🤖 <b>Claude Notification</b>
💬 $message"
    
    # 寄送 Telegram 通知
    echo "$formatted_message" | "$TELEGRAM_SCRIPT"
    
    return $?
}

```
接下來到claude code中設定hooks，進入claude code cli介面後，使用 **/hooks** 進入hooks設定介面，會出現以下畫面：
![Claude Code Hooks的畫面](/img/posts/claude_code_hooks.webp)

進入在Notification的欄位中Add new hook，輸入我們剛剛寫好的 shell script 路徑，也一起調整這個hooks為專案設定還是使用者全域設定。
這時候的settings.json會顯示你的hooks設定如下：

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

接下來就可以開始測試了，我自己很常在 Claude Code 執行時跳到其他視窗

很常遇到，在等待我approve，我卻沒有注意到，這時候就可以透過這個功能來提醒我。

這邊以請Claude Code 執行Bash命令串建一個資料夾作為舉例：

當他觸發 Notification 的時候，會自動寄送 Telegram 通知給我

再也不會忘記自己有叫Claude Code 做事了！😂


![Claude Code Hooks demo](/img/posts/claude_code_hooks_demo_2.webp)

---

# 結論
在設定 Claude Code Hooks 時，還可以運用Hook Output來決定執行hooks成功及失敗的對應邏輯，可以使用Exit Code或是Json Output來決定。
除此之外，matcher也可以設定在mcp tool 使用的情境，方便在觸發特定的mcp tool時，執行規劃好的hooks。透過設立好完善的hooks，可以讓
Claude Code的使用更加嚴謹，減少產生錯誤後續檢查的時間。

# 參考資料

[Claude Code Hooks 官方文件](https://docs.anthropic.com/en/docs/claude-code/hooks)
