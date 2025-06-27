---
title: Claude Code vs Gemini CLI — 你該換到 Gemini CLI 嗎？
date: 2025-06-27 13:00:00 +0800
categories: ["技術分享"]
tags: ["2025", "AI", "Claude Code", "Gemini CLI"]
author: Jimmy
description: 比較 Claude Code 和 Gemini CLI 的優缺點，協助你決定是否該換用 Gemini CLI
lang: zh-tw
page_id: claude_code_vs_gemini_cli
image:
  path: /img/posts/Gemini_CLI_Hero_Final.webp
  no_bg: true
---

# Google CLI 的發佈

Google 在 2025 年 6 月 26 日發佈了 Gemini CLI，也一起加入了Agent CLI 競賽的行列，並且提供開發者使用個人Google帳號登入就能免費使用Gemini CLI。
提供 Gemini 2.5 Pro 以及 100 token 的 context window。並且在model的請求額度可達到每分鐘 60 次，每日最多可達 1,000 次的模型執行額度，而這些 **完全免費**


---

# Claude Code 與 Gemini CLI 的比較
初步簡單的適用Gemini CLI，會覺得目前跟Claude Code使用上沒有太大的差別，
同樣支援免互動介面的操作模式，支援MCP的串接，比較特別的是原生支援了GoogleSearch跟WebFetch 的功能，
並且在記憶管理上可以說用 `--checkpoint` 來管理記憶體的使用以及支援 `-s` 進入sandbox 模式，避免污染本機環境

| 功能                | **Claude Code**                              | **Gemini CLI**                                                              |
| ------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| **安裝**            | `npm install -g @anthropic-ai/claude-code`   | `npm install -g @google/gemini-cli`                                         |
| **MCP 支援**        | ✅                                            | ✅                                                                           |
| **遙測功能**        | ✅                                            | ✅                                                                           |
| **記憶體管理**      | 使用 `CLAUDE.md` 進行記憶體管理               | 支援 `--checkpointing` 來儲存和恢復對話與檔案狀態                           |
| **安全性**          | 權限可透過 `settings.json` 設定               | 使用 `-s` 標記來沙盒化命令，避免不必要的系統變更                             |
| **使用需求**        | 需要 Claude Pro 訂閱                         | 免費使用，僅需 Google 帳戶；每分鐘 60 個模型請求，每日最多 1,000 個          |

---

# Gemini CLI 的使用步驟

**安裝 Gemini CLI**：
   ```bash
   npm install -g @google/gemini-cli
   ```
當安裝成功後會看到以下訊息：

![安裝成功畫面](/img/posts/gemini_cli.webp)

接下來就可以使用 Gemini CLI 了，以下是一些基本的使用指令：

**觀看 token 使用量**
```bash
/stats
```

**列出可用工具**
```bash
/tools
```
**不進入互動模式執行指令**
```bash
gemini -p "你的prompt"
```
---

# Claude Code 會跌入神壇嗎！？
目前看來，Claude Code 仍然是個不錯的選擇，特別是已經整合了不同的平台。且Claude 4 在程式碼的理解以及解決問題的能力也非常出眾，但Gemini CLI 也提供了不想課金的使用者一個不錯的選擇，並且完全開源，也為產品帶來了更多的可能性。
