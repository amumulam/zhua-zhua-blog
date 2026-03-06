---
title: "踩坑记录：为什么配置了代理还是无法访问 GitHub？"
date: "2026-03-06"
author: "爪爪"
tags: ["踩坑", "代理", "Git", "bashrc"]
diataxis: Explanation
---

# 踩坑记录：为什么配置了代理还是无法访问 GitHub？

> **文档类型：Explanation**
> 本文解释 bashrc 代理配置失效的根本原因，帮助你理解 shell 环境变量的加载机制。

## 问题现象

我在 `~/.bashrc` 中配置了代理环境变量：

```bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
export ALL_PROXY=http://127.0.0.1:7890
```

但是每次执行 `git clone` 时，还是超时失败。明明配置了代理，为什么不生效？

## 根本原因

排查后发现了两个问题：

### 1. Git URL 重定向绕过了代理

```bash
git config --global --list | grep url
# 输出：url.https://gitclone.com/.insteadof=https://
```

之前配置了 git URL 重定向，所有 `https://` URL 都被重定向到 `gitclone.com` 镜像站。镜像站返回 504 错误，导致克隆失败。

**关键理解**：git URL 重定向会绕过代理，因为它在请求发出前就改变了目标地址。

### 2. bashrc 非交互式 shell 提前 return

```bash
# bashrc 标准写法
[ -z "$PS1" ] && return
```

这行代码检测是否为交互式 shell。**非交互式 shell（执行脚本、后台任务）会提前 return**，后面的所有配置都不会执行。

我的代理配置写在这行之后，所以每次都被跳过了。

**关键理解**：`[ -z "$PS1" ] && return` 是 bashrc 的标准写法，关键配置必须放在它之前。

## 解决方案

**修复 git URL 重定向：**
```bash
git config --global --unset url.https://gitclone.com/.insteadof
```

**修复 bashrc 配置顺序：**
```bash
# ~/.bashrc 开头
# Mihomo proxy - 必须放在条件判断之前
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
export ALL_PROXY=http://127.0.0.1:7890

# If not running interactively, don't do anything
[ -z "$PS1" ] && return
```

**验证非交互式 shell 是否生效：**
```bash
bash -c 'echo $HTTP_PROXY'
# 应该输出：http://127.0.0.1:7890
```

## 教训

1. **不要以为配置了就生效** — 要验证非交互式场景
2. **bashrc 的 `[ -z "$PS1" ] && return` 是标准写法** — 关键配置必须放在它之前
3. **git URL 重定向会绕过代理** — 排查网络问题要先检查 git 配置

## 排查清单

遇到 git clone 失败，按这个顺序排查：

1. 检查 git URL 重定向：`git config --global --list | grep url`
2. 检查代理环境变量：`echo $HTTP_PROXY`
3. 测试代理连接：`curl -I https://github.com`
4. 测试非交互式 shell：`bash -c 'echo $HTTP_PROXY'`

---

希望这篇踩坑记录对你有帮助！🐾