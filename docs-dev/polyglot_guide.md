# Jekyll-Polyglot 完整配置指南

## 什麼是 Jekyll-Polyglot？

Jekyll-Polyglot 是一個快速、無痛的開源國際化插件，專為 Jekyll 部落格設計。它可以讓您的 Jekyll 網站輕鬆支援多種語言，並提供以下強大功能：

- 自動相對化 URL
- 缺失內容的回退支援
- 強大的 SEO 工具
- 並行語言處理
- 本地化資料支援

## 第一步：安裝插件

### 方法一：使用 Bundler（推薦）

在您的 `Gemfile` 中加入：

```ruby
group :jekyll_plugins do
   gem "jekyll-polyglot"
end
```

然後執行：
```bash
bundle install
```

### 方法二：手動安裝

```bash
gem install jekyll-polyglot
```

然後在 `_config.yml` 中指定插件：

```yaml
plugins:
  - jekyll-polyglot
```

## 第二步：基本配置

在您的 `_config.yml` 檔案中加入以下配置：

```yaml
# 多語言設定
languages: ["en", "zh-tw", "zh-cn", "ja"]  # 您要支援的語言
default_lang: "zh-tw"                      # 預設語言
exclude_from_localization: ["javascript", "images", "css", "public", "sitemap"]
parallel_localization: true               # 並行處理（Windows 用戶設為 false）
url: https://yourwebsite.com              # 您的網站 URL（必填）
```

### 配置選項詳解：

- **languages**: 您想支援的語言代碼列表
- **default_lang**: 當某語言版本缺失時的回退語言
- **exclude_from_localization**: 不需要本地化的檔案/資料夾
- **parallel_localization**: 是否並行處理（提升建置速度）
- **url**: 網站 URL，用於正確處理相對連結

### 可選配置：

```yaml
lang_from_path: true    # 從檔案路徑自動判斷語言
lang_vars: ['lang', 'language']  # 可用的語言變數名稱
```

## 第三步：創建多語言內容

### 1. 頁面和文章的語言設定

在每個頁面或文章的 YAML 前置matter 中加入：

```yaml
---
title: 關於我們
lang: zh-tw
permalink: /about/
---
```

### 2. 檔案組織結構

**方法一：統一命名**
```
_posts/2024-01-01-hello-world-en.md
_posts/2024-01-01-hello-world-zh-tw.md
_posts/2024-01-01-hello-world-ja.md
```

**方法二：資料夾分類**
```
_posts/en/2024-01-01-hello-world.md
_posts/zh-tw/2024-01-01-hello-world.md
_posts/ja/2024-01-01-hello-world.md
```

### 3. 使用 page_id 關聯翻譯

如果您想為不同語言使用不同的 URL：

```yaml
# 英文版 - /about/
---
title: About Us
permalink: /about/
lang: en
page_id: about_page
---

# 中文版 - /關於我們/
---
title: 關於我們
permalink: /關於我們/
lang: zh-tw
page_id: about_page
---
```

## 第四步：本地化資料檔案

### 創建語言特定的資料檔案

```
_data/
├── en/
│   └── strings.yml
├── zh-tw/
│   └── strings.yml
└── ja/
    └── strings.yml
```

**_data/zh-tw/strings.yml**
```yaml
navigation:
  home: "首頁"
  about: "關於"
  contact: "聯絡"
messages:
  welcome: "歡迎來到我們的網站"
  read_more: "閱讀更多"
```

**_data/en/strings.yml**
```yaml
navigation:
  home: "Home"
  about: "About"
  contact: "Contact"
messages:
  welcome: "Welcome to our website"
  read_more: "Read More"
```

### 在模板中使用本地化資料

```liquid
<nav>
  <a href="/">{{ site.data[site.active_lang].strings.navigation.home }}</a>
  <a href="/about/">{{ site.data[site.active_lang].strings.navigation.about }}</a>
</nav>

<h1>{{ site.data[site.active_lang].strings.messages.welcome }}</h1>
```

## 第五步：模板配置

### 1. 可用的 Liquid 變數

```liquid
{{ site.languages }}      <!-- 所有支援的語言 -->
{{ site.default_lang }}   <!-- 預設語言 -->
{{ site.active_lang }}    <!-- 當前語言 -->
```

### 2. 語言切換器

```liquid
<div class="language-switcher">
  {% for lang in site.languages %}
    {% if lang == site.active_lang %}
      <span class="current-lang">{{ lang }}</span>
    {% else %}
      <a href="/{% if lang != site.default_lang %}{{ lang }}/{% endif %}">{{ lang }}</a>
    {% endif %}
  {% endfor %}
</div>
```

### 3. 使用 permalink_lang 的進階語言切換器

```liquid
{% for lang in site.languages %}
  {% capture lang_href %}{{site.baseurl}}/{% if lang != site.default_lang %}{{ lang }}/{% endif %}{% if page.permalink_lang[lang] != '/' %}{{page.permalink_lang[lang]}}{% endif %}{% endcapture %}
  <a href="{{ lang_href }}" hreflang="{{ lang }}">{{ lang }}</a>
{% endfor %}
```

### 4. 靜態連結（不被相對化）

當您不希望某個連結被自動本地化時：

```liquid
<a {% static_href %}href="/about"{% endstatic_href %}>靜態連結</a>
```

## 第六步：SEO 優化

### 1. 生成多語言 Sitemap

**sitemap.xml**
```xml
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  {% for lang in site.languages %}
    {% for page in site.pages %}
      {% if page.permalink %}
        <url>
          <loc>{{ site.url }}{% if lang != site.default_lang %}/{{ lang }}{% endif %}{{ page.url }}</loc>
          {% for otherlang in site.languages %}
            <xhtml:link rel="alternate" hreflang="{{ otherlang }}" 
                       href="{{ site.url }}{% if otherlang != site.default_lang %}/{{ otherlang }}{% endif %}{{ page.url }}" />
          {% endfor %}
        </url>
      {% endif %}
    {% endfor %}
  {% endfor %}
</urlset>
```

### 2. HTML head 中的語言標記

```liquid
{% for lang in site.languages %}
  {% capture lang_href %}{{site.baseurl}}/{% if lang != site.default_lang %}{{ lang }}/{% endif %}{% if page.permalink_lang[lang] != '/' %}{{page.permalink_lang[lang]}}{% endif %}{% endcapture %}
  <link rel="alternate" hreflang="{{ lang }}" href="{{ site.url }}{{ lang_href }}" />
{% endfor %}
```

## 第七步：進階功能

### 1. 限制特定語言生成

```yaml
---
title: 僅限中文和英文
lang-exclusive: ['zh-tw', 'en']
---
```

### 2. 本地化集合（Collections）

**_config.yml**
```yaml
collections:
  projects:
    output: true
    permalink: /:collection/:title/
```

**檔案結構**
```
_projects/
├── project-1-en.md
├── project-1-zh-tw.md
└── project-1-ja.md
```

### 3. 使用鉤子事件

```ruby
Jekyll::Hooks.register :polyglot, :post_write do |site|
  # 所有語言建置完成後執行
  puts "所有語言版本建置完成！"
end
```

## 第八步：常見問題與解決方案

### Windows 用戶

在 `_config.yml` 中設定：
```yaml
parallel_localization: false
```

### Jekyll 4.0 SCSS 問題

```yaml
sass:
  sourcemap: never
```

### 除外配置

記得將 sitemap.xml 加入除外清單：
```yaml
exclude_from_localization: ["javascript", "images", "css", "public", "sitemap"]
```

## 完整的 _config.yml 範例

```yaml
# Jekyll 基本設定
title: "我的多語言網站"
description: "支援多語言的 Jekyll 網站"
baseurl: ""
url: "https://yourwebsite.com"

# Polyglot 設定
languages: ["zh-tw", "en", "ja"]
default_lang: "zh-tw"
exclude_from_localization: ["javascript", "images", "css", "public", "sitemap", "robots.txt"]
parallel_localization: true
lang_from_path: true

# 插件
plugins:
  - jekyll-polyglot

# 集合
collections:
  projects:
    output: true
    permalink: /:collection/:title/

# SCSS 設定（Jekyll 4.0）
sass:
  sourcemap: never

# 其他設定
markdown: kramdown
highlighter: rouge
```

這樣您就完成了 Jekyll-Polyglot 的完整配置！現在您的 Jekyll 網站可以支援多語言，並且具備了強大的 SEO 優化功能。

references:
- [Jekyll-Polyglot GitHub](https://github.com/untra/polyglot)
- [Jekyll 官方文檔](https://jekyllrb.com/docs/)

請參考這份指南的指導將我網站套用，我目前已經執行到了一半，現在會有個問題，我的語言切換按鈕點的時候沒有反應，我希望可以將它放在左邊sidebar 關於的下面，並確保可以切換語言，polyglot_guid.md是關於plugin的手冊，Claude.md是關於整個專案的架構，如果你需要fetch任何內容，請直接使用fectch tool
