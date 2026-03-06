# 博客加密功能设计

## 需求

为 zhuazhua-and-friends-blog 添加加密博文/加密日记功能。

---

## 技术选型

### 方案对比

| 方案 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| **mkdocs-encryptcontent-plugin** | MkDocs 官方插件，AES 加密 | 简单、易用、与 MkDocs 集成 | 密码需硬编码在配置中 |
| **自定义前端加密** | 使用 Web Crypto API | 灵活、可自定义 | 需要自己实现 |
| **第三方服务** | Cloudflare Access 等 | 更安全 | 需要付费、需要后端 |

**推荐**：**mkdocs-encryptcontent-plugin**

---

## 实现方案

### 1. 安装插件

```bash
pip install mkdocs-encryptcontent-plugin
```

### 2. 配置 mkdocs.yml

```yaml
plugins:
  - search:
      lang: 
        - zh
        - en
  - tags
  - macros
  - rss:
      match_path: "(blog|diary)/.*"
      date_from_meta:
        as_creation: date
      categories:
        - categories
        - tags
  - encryptcontent:
      title_prefix: '🔒 '
      decryption_failure_message: '密码错误，请重试'
      encryption_info_message: '此内容需要密码访问'
      placeholder: '输入密码'
      input_class: 'md-input'
      button_class: 'md-button'
      button_text: '解锁'
     remember_password: true
      session_storage: true
      password_button: true
      input_button: true
```

### 3. 使用方式

在 Markdown 文件的 frontmatter 中添加密码：

```markdown
---
title: 我的私密日记
date: 2026-03-06
password: your-password-here
---

这是加密的内容...
```

或者全局加密：

```yaml
plugins:
  - encryptcontent:
      global_password: 'global-password'
```

---

## 安全考虑

### ⚠️ 静态站点加密的限制

| 问题 | 说明 |
|------|------|
| **密码存储** | 密码会出现在源码中，查看源码可能泄露 |
| **客户端解密** | 密码和加密内容都会发送到客户端 |
| **SEO 不友好** | 搜索引擎无法索引加密内容 |
| **不是真正的安全** | 只能防止普通用户，无法防止技术人员 |

### 建议

1. **不要加密敏感信息** - 如密码、密钥、个人隐私
2. **仅用于轻度隐私保护** - 如私人日记、未完成的文章
3. **使用强密码** - 避免简单密码

---

## 实现步骤

| 步骤 | 内容 | 状态 |
|------|------|------|
| 1 | 安装 mkdocs-encryptcontent-plugin | 待实现 |
| 2 | 更新 mkdocs.yml 配置 | 待实现 |
| 3 | 更新 requirements.txt | 待实现 |
| 4 | 测试加密功能 | 待实现 |
| 5 | 编写使用文档 | 待实现 |

---

## 替代方案

如果需要更强的安全性：

| 方案 | 说明 |
|------|------|
| **VPS + 认证** | 部署到 VPS，使用 HTTP Basic Auth |
| **Cloudflare Access** | 使用 Cloudflare 的访问控制 |
| **私有仓库** | 敏感内容放在私有仓库 |

---

## 参考资料

- [mkdocs-encryptcontent-plugin](https://github.com/unverbuggt/mkdocs-encryptcontent-plugin)
- [MkDocs Plugins](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins)

EOF