#!/bin/bash

# Markdown 分割线自动修复脚本
# 确保分割线 (---) 前后都有空行

echo "🔧 自动修复 Markdown 文件分割线格式..."

# 获取所有 Markdown 文件
FILES=$(find content app -name "*.md" -o -name "*.mdx" 2>/dev/null)

if [ -z "$FILES" ]; then
  echo "⚠️  未找到 Markdown 文件"
  exit 0
fi

FIXED_COUNT=0

for FILE in $FILES; do
  if [ -f "$FILE" ]; then
    # 创建临时文件
    TEMP_FILE=$(mktemp)
    
    # 使用 awk 自动修复分割线格式
    awk '
    BEGIN { 
      prev_line = ""
      buffer = ""
    }
    
    # 当前行是分割线
    /^---$/ {
      # 如果前一行不是空行，先输出一个空行
      if (prev_line != "" && prev_line !~ /^[[:space:]]*$/) {
        print ""
      }
      # 输出分割线
      print "---"
      # 标记下一行应该检查
      prev_line = "---"
      next
    }
    
    # 如果前一行是分割线，当前行不是空行
    prev_line == "---" && $0 != "" && $0 !~ /^[[:space:]]*$/ {
      # 先输出一个空行
      print ""
    }
    
    # 输出当前行
    {
      print $0
      prev_line = $0
    }
    ' "$FILE" > "$TEMP_FILE"
    
    # 检查是否有修改
    if ! cmp -s "$FILE" "$TEMP_FILE"; then
      echo "  ✅ 修复：$FILE"
      cp "$TEMP_FILE" "$FILE"
      FIXED_COUNT=$((FIXED_COUNT + 1))
    fi
    
    rm -f "$TEMP_FILE"
  fi
done

echo ""
if [ $FIXED_COUNT -gt 0 ]; then
  echo "✅ 已修复 $FIXED_COUNT 个文件的分割线格式"
else
  echo "✅ 所有文件格式正确"
fi
