---

title: "在 OpenClaw 中安装 Anthropic 官方 Skills"
date: 2026-02-27
tags: ["OpenClaw", "Skills", "installation-guide", "AI-Agent"]
summary: "如何在 OpenClaw 中安装 Anthropic 官方 15 个技能。"


---

## 概述

本指南展示如何在 OpenClaw 中安装 Anthropic 官方 Skills，获得文档处理、设计创作、开发测试等扩展能力。

**前提条件：**
- 已安装 OpenClaw
- 有 Git 访问权限

**技能安装位置：** `/root/.openclaw/workspace/skills/`


---

## 步骤 1：确认已有技能

```bash
ls /root/.openclaw/workspace/skills/
```

如果已有 `skill-creator`，不需要重复安装。


---

## 步骤 2：克隆 Anthropic Skills 仓库

```bash
# 进入技能目录
cd /root/.openclaw/workspace/skills/

# 克隆仓库
git clone https://github.com/anthropics/skills.git anthropic-official

# 移动技能到正确位置
mv anthropic-official/skills/* ./

# 清理临时目录
rm -rf anthropic-official
```


---

## 步骤 3：验证安装

```bash
# 检查技能数量
ls -la | wc -l

# 检查技能结构完整性
ls docx/scripts/
ls pdf/scripts/
ls pptx/scripts/
```

预期结果：每个技能都应该有 `scripts/` 目录。


---

## 安装的技能列表

| 分类 | 技能 |
|------|------|
| 文档 | docx, pdf, pptx, xlsx, doc-coauthoring |
| 设计 | algorithmic-art, canvas-design, frontend-design, theme-factory, brand-guidelines, slack-gif-creator |
| 开发 | mcp-builder, web-artifacts-builder, webapp-testing |
| 沟通 | internal-comms |


---

## 故障排除

### 问题 1：技能目录不完整

**原因：** git clone 时网络中断

**解决：** 删除后重新克隆

```bash
rm -rf anthropic-official
git clone https://github.com/anthropics/skills.git anthropic-official
```

### 问题 2：技能无法触发

**原因：** SKILL.md 文件缺失或损坏

**解决：** 检查 SKILL.md 是否存在

```bash
ls /root/.openclaw/workspace/skills/*/SKILL.md
```


---

## 相关资源

- [Anthropic Skills 仓库](https://github.com/anthropics/skills)
- [ClawHub 技能市场](https://clawhub.com)


---

**文档类型**: How-to Guide  
**创建日期**: 2026-02-27  
**版本**: 2.0（精简版）