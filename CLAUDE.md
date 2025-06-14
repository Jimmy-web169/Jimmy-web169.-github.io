# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個基於 Jekyll 的 Chirpy 主題部落格專案，專注於技術寫作的響應式主題。使用 Ruby/Jekyll 作為靜態網站生成器，並包含現代化的前端建置流程。

## 常用指令

### 開發環境
- `bundle install` - 安裝 Ruby 依賴項
- `npm install` - 安裝 Node.js 依賴項
- `bash tools/run.sh` - 啟動本地開發伺服器
- `bash tools/run.sh -H 0.0.0.0` - 指定主機地址啟動伺服器
- `bash tools/run.sh -p` - 以 production 模式運行

### 建置與測試
- `npm run build` - 建置所有資源 (CSS 和 JavaScript)
- `npm run build:css` - 建置並優化 CSS (使用 PurgeCSS)
- `npm run build:js` - 建置 JavaScript (使用 Rollup)
- `npm run watch:js` - 監控模式建置 JavaScript
- `bash tools/test.sh` - 建置網站並執行測試 (使用 HTMLProofer)

### 程式碼品質
- `npm run lint:scss` - 檢查 SCSS 程式碼風格
- `npm run lint:fix:scss` - 自動修正 SCSS 程式碼風格問題
- `npm test` - 執行所有測試（當前為 SCSS 檢查）

### Jekyll 相關
- `bundle exec jekyll serve` - 基本 Jekyll 開發伺服器
- `bundle exec jekyll build` - 建置靜態網站
- `JEKYLL_ENV=production bundle exec jekyll build` - 以 production 模式建置

## 架構概覽

### 前端建置系統
- **Rollup**: 模組打包工具，配置於 `rollup.config.js`
- **Babel**: JavaScript 轉譯，支援現代 ES6+ 語法
- **PurgeCSS**: CSS 優化，移除未使用的樣式
- **Stylelint**: SCSS 程式碼規範檢查

### 目錄結構
- `_javascript/`: 前端 JavaScript 原始碼
  - `modules/`: 可重複使用的模組
  - `pwa/`: PWA 相關檔案
- `_sass/`: SCSS 樣式檔案
  - `abstracts/`: 變數、mixins、函數
  - `base/`: 基礎樣式
  - `components/`: 元件樣式
  - `layout/`: 版面配置
  - `pages/`: 頁面特定樣式
  - `themes/`: 明亮/暗色主題
- `_layouts/`: Jekyll 版面模板
- `_includes/`: 可重複使用的 HTML 片段
- `_data/`: 資料檔案，包含多語言支援
- `assets/js/dist/`: 建置後的 JavaScript 檔案
- `tools/`: 開發和測試腳本

### 主要特色
- 支援深色模式切換
- 多語言國際化 (i18n) 支援
- PWA 功能
- 響應式設計
- 語法高亮
- 數學公式渲染 (MathJax)
- Mermaid 圖表支援
- 內建搜索功能
- 社交媒體整合
- 多種網站分析工具支援

### 開發注意事項
- JavaScript 模組使用 ES6+ 語法，透過 Babel 轉譯
- 樣式使用 SCSS，遵循 BEM 命名規範
- 國際化檔案位於 `_data/locales/`
- 前端資源建置後輸出至 `assets/js/dist/`
- 使用 Jekyll 的 Front Matter 和 Liquid 模板語法
- PWA 配置包含服務工作者 (Service Worker) 和應用程式清單

### 測試與部署
- 使用 HTMLProofer 進行連結和 HTML 驗證
- 支援 GitHub Pages 部署
- 可配置多種 CDN 和靜態資源託管

## 新文章發布流程

當撰寫新文章後，建議的部署流程：

1. **新增文章檔案**
   - 在 `_posts/` 目錄下建立新的 Markdown 檔案
   - 檔案命名格式：`YYYY-MM-DD-文章標題.md`
   - 確保 Front Matter 包含必要的 `title`、`date`、`categories`、`tags` 等資訊

2. **本地測試**
   ```bash
   # 啟動本地開發伺服器預覽文章
   bash tools/run.sh
   
   # 或直接使用 Jekyll 命令
   bundle exec jekyll serve
   ```

3. **建置與驗證**
   ```bash
   # 建置前端資源
   npm run build
   
   # 執行完整測試（包含 HTML 驗證和連結檢查）
   bash tools/test.sh
   
   # 檢查 SCSS 程式碼風格
   npm run lint:scss
   ```

4. **提交變更**
   ```bash
   # 加入變更檔案
   git add .
   
   # 提交變更
   git commit -m "feat: add new post about [文章主題]"
   
   # 推送到遠端倉庫
   git push origin master
   ```

5. **部署確認**
   - GitHub Pages 會自動偵測到 master 分支的變更並觸發部署
   - 等待數分鐘後檢查網站是否正常更新
   - 確認新文章在首頁、分類頁面和標籤頁面正確顯示