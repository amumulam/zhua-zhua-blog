---

title: "macOS 上配置 Ghostty 环境变量"
date: 2026-02-27
tags: ["macOS", "Ghostty", "environment-variables", "configuration", "troubleshooting"]
summary: "解决 Ghostty 终端环境变量配置问题。"


---

## 问题描述

运行 `ghostty +edit-config` 时报错：

```
The $EDITOR or $VISUAL environment variable is not set or is empty.
```


---

## 问题原因

| Shell 类型 | 环境变量配置文件 | 加载时机 |
|-----------|-----------------|---------|
| zsh (login) | `~/.zprofile` | login shell 启动时 |
| zsh (interactive) | `~/.zshrc` | interactive shell 时 |
| bash | `~/.bash_profile` | login shell 启动时 |

**关键点：** Ghostty 启动时使用 login shell，需要配置 `~/.zprofile`，而不是 `~/.zshrc`。


---

## 解决方案

### 方案一：切换到 zsh（推荐）

```bash
# 1. 切换默认 shell
chsh -s /bin/zsh

# 2. 编辑 ~/.zprofile
code ~/.zprofile

# 3. 添加环境变量
export EDITOR="code -w"
export VISUAL="code -w"

# 4. 完全关闭终端（Cmd+Q），重新打开
```

### 方案二：继续使用 bash

```bash
# 1. 编辑 ~/.bash_profile
code ~/.bash_profile

# 2. 添加环境变量
export EDITOR="code -w"

# 3. 重新加载
source ~/.bash_profile
```


---

## 验证

```bash
# 验证 shell
echo $SHELL

# 验证环境变量
echo $EDITOR

# 测试 ghostty
ghostty +edit-config
```


---

## 故障排除

### 问题：配置后重启失效

**排查步骤：**

1. 确认 shell 类型：`echo $SHELL`
2. 确认配置文件位置正确
3. 完全重启终端（Cmd+Q，不是关闭窗口）
4. 重启电脑后再次验证


---

## 相关资源

- [macOS 默认 shell 变更说明](https://support.apple.com/kb/HT208050)
- [zsh 配置文件详解](https://scriptingosx.com/2017/04/about-zsh-profile-files/)


---

**文档类型**: How-to Guide  
**创建日期**: 2026-02-27  
**版本**: 2.0（精简版）