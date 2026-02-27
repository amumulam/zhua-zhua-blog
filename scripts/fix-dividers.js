#!/usr/bin/env node

/**
 * Markdown 分割线自动修复脚本
 * 
 * 功能：
 * - 检查 content 目录下所有 Markdown 文件（递归）
 * - 确保分割线（---）前后都有两个换行符（空行）
 * - 自动修复格式问题
 * 
 * 使用方式：
 * - 手动运行：node scripts/fix-dividers.js
 * - Git commit 前自动触发
 */

const fs = require('fs')
const path = require('path')

// 获取 content 目录路径
const CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * 递归获取目录下所有 Markdown 文件
 */
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, fileList)
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * 修复 Markdown 文件中的分割线格式
 * 确保分割线前后都有两个换行符
 */
function fixDividers(content) {
  const lines = content.split('\n')
  const result = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const prevLine = i > 0 ? lines[i - 1] : ''
    const nextLine = i < lines.length - 1 ? lines[i + 1] : ''

    // 检查是否是分割线
    if (line.trim() === '---') {
      // 检查前一行是否为空行，如果不是，添加空行
      if (prevLine.trim() !== '') {
        result.push('')
      }
      
      // 添加分割线
      result.push(line)
      
      // 检查后一行是否为空行，如果不是，添加空行
      if (nextLine.trim() !== '') {
        result.push('')
      }
    } else {
      result.push(line)
    }
  }

  return result.join('\n')
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 检查并修复 Markdown 文件分割线格式...')
  
  // 获取所有 Markdown 文件
  const markdownFiles = getMarkdownFiles(CONTENT_DIR)
  
  if (markdownFiles.length === 0) {
    console.log('✅ 未找到 Markdown 文件')
    return
  }

  let fixedCount = 0

  // 逐个修复
  markdownFiles.forEach(file => {
    const originalContent = fs.readFileSync(file, 'utf8')
    const fixedContent = fixDividers(originalContent)

    // 检查是否有修改
    if (originalContent !== fixedContent) {
      fs.writeFileSync(file, fixedContent, 'utf8')
      console.log(`  ✅ 修复：${path.relative(process.cwd(), file)}`)
      fixedCount++
    }
  })

  // 输出结果
  console.log('')
  if (fixedCount > 0) {
    console.log(`✅ 已修复 ${fixedCount} 个文件的分割线格式`)
  } else {
    console.log('✅ 所有文件格式正确')
  }
}

// 执行
main()
