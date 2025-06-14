# Chirpy 主題建站指南

這是一份針對 Chirpy 主題的完整建站教學，包括從建立倉庫、設置開發環境、啟動網站、設定內容到部署上線的全部流程。

---

## 🏗️ 開始使用 Chirpy 主題

Chirpy 是基於 Jekyll 的一個靜態網站主題，適合建立個人部落格或文檔網站。本文將指導你如何安裝、設置、使用及部署基於 Chirpy 的網站。

---

## 📁 建立網站倉庫（Repository）

### ✅ 選項 1：使用 Starter（推薦）

1. 登入 GitHub 並前往 Chirpy 的 starter 倉庫。
2. 點擊 **Use this template**，然後選擇 **Create a new repository**。
3. 命名新倉庫為：`<username>.github.io`。

### ⚙️ 選項 2：Fork 主題原始倉庫

1. 登入 GitHub。
2. Fork 主題倉庫到你的帳號。
3. 命名新倉庫為：`<username>.github.io`。

---

## 🧱 設置開發環境

### 🐳 使用 Dev Containers（推薦 Windows 使用者）

1. 安裝 Docker（Desktop/Engine）。
2. 安裝 VS Code 和 Dev Containers 擴展。
3. 使用 VS Code 克隆並開啟你的倉庫。
4. 等待 Dev Containers 自動設置環境。

### 🖥️ 本地原生安裝（macOS/Linux）

1. 安裝 Jekyll 和 Git。
2. 克隆你的倉庫。
3. 如果使用 fork，執行：
   ```bash
   bash tools/init.sh
   ```
4. 執行：
   ```bash
   bundle
   ```

---

## 🚀 啟動網站

使用以下命令啟動：

```bash
bundle exec jekyll serve
```

瀏覽器開啟網址：`http://127.0.0.1:4000`

---

## ⚙️ 設定網站 (_config.yml)

可設定以下欄位：

- `url`
- `avatar`
- `timezone`
- `lang`

---

## 🔗 設定社群聯絡方式

在 `_data/contact.yml` 設定顯示哪些社群平台。

---

## 🎨 自訂樣式

1. 複製 `assets/css/jekyll-theme-chirpy.scss`。
2. 加入自訂樣式於檔案末尾。

---

## 📦 管理靜態資源

靜態資源的 CDN 設定在 `_data/origin/cors.yml`，可替換為地區適合的 CDN，或使用 [chirpy-static-assets](https://github.com/cotes2020/chirpy-static-assets) 自行託管。

---

## 🌐 部署網站

### GitHub Actions 自動部署

1. 確保倉庫為公開。
2. 執行：
   ```bash
   bundle lock --add-platform x86_64-linux
   ```
3. GitHub 設定：**Settings → Pages → Source → GitHub Actions**
4. 提交任何 commit 即可觸發部署。

### 📤 手動部署至自架伺服器

1. 執行建置：
   ```bash
   JEKYLL_ENV=production bundle exec jekyll b
   ```
2. 上傳 `_site` 資料夾內容至伺服器即可。

---

> 若需範例專案、部署腳本或 config 模板，請隨時告訴我。
