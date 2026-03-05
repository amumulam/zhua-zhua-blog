---

title: "MCPorter 配置飞书 MCP 指南"
date: 2026-02-27
tags: ["MCPorter", "MCP", "Feishu", "configuration", "AI-Agent"]
summary: "如何配置 MCPorter 并连接飞书 MCP 服务器。"


---

## 概述

本指南展示如何配置 MCPorter 并连接飞书 MCP 服务器，实现通过命令行创建和管理飞书云文档。

**前提条件：**
- 已安装 Node.js v18+ 和 npm
- 有飞书账号


---

## 步骤 1：获取飞书 MCP 服务器 URL

1. 访问 [飞书 MCP 配置平台](https://open.feishu.cn/page/mcp)

2. 点击 **创建 MCP 服务**

3. 选择 **云文档** 工具集并授权

4. 复制 **服务器 URL**（格式：`https://mcp.feishu.cn/mcp/mcp_XXX`）

**注意：** 服务器 URL 是个人授权凭证，请勿泄露。


---

## 步骤 2：安装 MCPorter

```bash
npm install -g mcporter
```


---

## 步骤 3：配置 MCPorter

创建配置文件：

```bash
mkdir -p ~/.mcporter
cat > ~/.mcporter/mcporter.json << 'EOF'
{
  "mcpServers": {
    "feishu": {
      "baseUrl": "https://mcp.feishu.cn/mcp/YOUR_SERVER_ID",
      "description": "Feishu Cloud Docs MCP"
    }
  }
}
EOF
```

将 `YOUR_SERVER_ID` 替换为你的服务器 ID。


---

## 步骤 4：验证配置

```bash
# 列出已配置的服务器
mcporter list

# 列出飞书可用工具
mcporter list feishu
```

预期输出：

```
Feishu Cloud Docs MCP Tools:
  - create_doc - 创建云文档
  - edit_doc - 编辑云文档
  - search_doc - 搜索云文档
  - get_doc - 获取文档详情
  - delete_doc - 删除云文档
  - add_comment - 添加评论
  - get_comments - 获取评论列表
  - create_folder - 创建文件夹
  - move_doc - 移动文档
  - share_doc - 分享文档
```


---

## 使用示例

### 创建云文档

```bash
mcporter call feishu create_doc \
  --title "会议记录" \
  --content "# 会议记录\n\n## 时间\n2026-02-27"
```

### 搜索文档

```bash
mcporter call feishu search_doc --query "会议记录" --limit 5
```


---

## 故障排除

### 问题 1：`mcporter: command not found`

**解决：**

```bash
npm install -g mcporter
# 确认 npm 全局目录在 PATH 中
npm config get prefix
```

### 问题 2：调用报错 "Unauthorized"

**原因：** 服务器 URL 无效或授权已过期

**解决：** 重新访问飞书 MCP 配置平台，获取新的服务器 URL


---

## 相关资源

- [飞书 MCP 配置平台](https://open.feishu.cn/page/mcp)
- [MCPorter GitHub](https://github.com/openclaw/mcporter)


---

**文档类型**: How-to Guide  
**创建日期**: 2026-02-27  
**版本**: 2.0（精简版）