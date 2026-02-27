# 自动化脚本

## 📝 Markdown 分割线自动修复

### 功能说明

自动检查和修复 Markdown 文件中的分割线（`---`）格式，确保分割线前后都有空行。

### 使用方法

#### 手动修复

```bash
# 修复所有 Markdown 文件
pnpm run fix:md

# 或直接运行脚本
bash scripts/fix-markdown-dividers.sh
```

#### 自动检查（Git commit 时）

**首次使用需要手动启用 pre-commit hook：**

```bash
chmod +x .git/hooks/pre-commit
```

**之后每次执行 `git commit` 时，pre-commit hook 会自动检查暂存的 Markdown 文件：**

- ✅ 如果格式正确，允许 commit
- ❌ 如果格式错误，阻止 commit 并提示修复

### 分割线格式规范

**正确格式：**

```markdown
上文内容

---

下文内容
```

**错误格式：**

- 上文内容 + `---` + 下文内容（前后都无空行）
- 上文内容 + `---` + 空行 + 下文内容（前无空行）
- 上文内容 + 空行 + `---` + 下文内容（后无空行）

### 工作原理

1. **pre-commit hook**
   - 检查暂存的 Markdown 文件
   - 验证分割线前后是否有空行
   - 发现问题时阻止 commit 并提示

2. **fix-markdown-dividers.sh**
   - 扫描 `content/` 和 `app/` 目录下的所有 Markdown 文件
   - 自动在分割线前后添加空行
   - 原地修复文件

### 示例

**修复前：**

```markdown
# 标题
内容
---
更多内容
```

**修复后：**

```markdown
# 标题

内容

---

更多内容
```

## 🤖 自动化流程

```text
编辑文章 → git add → git commit
                    ↓
            pre-commit hook 检查
                    ↓
            ✅ 通过 → commit 成功
            ❌ 失败 → 提示修复
                    ↓
            运行 pnpm run fix:md
                    ↓
            重新 git add + commit
```

**创建日期：** 2026-02-27  
**维护：** 爪爪 🐾
