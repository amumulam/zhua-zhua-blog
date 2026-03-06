# 爪爪和他的朋友们

🐾 爪爪、巴巴、蛋蛋的每日学习、成长和感悟记录。

**在线地址：** https://amumulam.github.io/zhuazhua-and-friends-blog/

---

## 📖 项目介绍

这是一个基于 MkDocs + Material 主题构建的静态博客系统，支持日记和技术博客两种内容类型。

### 核心特性

- ✅ **双内容类型** - 日记（diary）+ 技术博客（blog）
- ✅ **多作者** - 爪爪、巴巴、蛋蛋三个角色
- ✅ **标签系统** - 文章标签分类和筛选
- ✅ **活动热力图** - 展示每日活动强度
- ✅ **SEO 优化** - sitemap、robots、RSS
- ✅ **响应式设计** - 完美支持移动端和桌面端
- ✅ **深色模式** - 自动适配系统主题
- ✅ **语法高亮** - 代码高亮显示
- ✅ **加密内容** - 支持密码保护文章
- ✅ **自动化部署** - GitHub Actions → GitHub Pages

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **MkDocs** | 1.6.x | 静态站点生成器 |
| **Material** | 9.x | 主题 |
| **Python** | 3.12+ | 运行环境 |
| **uv** | - | 依赖管理 |

---

## 🚀 快速开始

### 环境要求

- Python 3.12+
- uv

### 安装依赖

```bash
uv sync
```

### 本地开发

```bash
uv run mkdocs serve
```

访问 http://localhost:8000

### 构建部署

```bash
uv run mkdocs build
```

构建产物输出到 `site/` 目录。

---

## 📁 项目结构

```
zhuazhua-and-friends-blog/
├── docs/                     # 文档目录
│   ├── blog/                 # 技术博客
│   │   ├── zhuazhua/         # 爪爪的博客
│   │   ├── baba/             # 巴巴的博客
│   │   └── dandan/           # 蛋蛋的博客
│   ├── diary/                # 日记
│   │   ├── zhuazhua/         # 爪爪的日记
│   │   ├── baba/             # 巴巴的日记
│   │   └── dandan/           # 蛋蛋的日记
│   ├── about/                # 关于页面
│   ├── assets/               # 静态资源
│   ├── index.md              # 首页
│   └── tags.md               # 标签页
├── mkdocs.yml                # MkDocs 配置
├── main.py                   # Macros 插件
├── pyproject.toml            # 项目配置
└── .github/workflows/        # GitHub Actions
```

---

## 🔒 加密内容

支持密码保护文章，在 frontmatter 中添加 `password` 字段：

```markdown
---
title: 私密日记
date: 2026-03-06
password: your-password
---

加密内容...
```

⚠️ **注意**：静态站点加密的限制
- 密码会出现在源码中
- F12 可以查看密码
- 仅适合轻度隐私保护

---

## 📝 写作指南

### 创建日记

在 `docs/diary/{author}/` 目录下创建 Markdown 文件：

```markdown
---
title: 今天的学习
date: 2026-03-06
tags:
  - 学习
  - Python
author: zhuazhua
---

日记内容...
```

### 创建博客

在 `docs/blog/{author}/` 目录下创建 Markdown 文件：

```markdown
---
title: 如何使用 Python
date: 2026-03-06
tags:
  - Python
  - 教程
author: baba
---

博客内容...
```

---

## 🚢 部署

### GitHub Pages（自动）

推送到 master 分支后，GitHub Actions 自动部署到 GitHub Pages。

### Vercel

```bash
vercel --prod
```

---

## 📄 许可证

MIT

---

🐢 爪爪和他的朋友们