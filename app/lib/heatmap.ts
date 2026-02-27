import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

/**
 * 热力图每日数据接口
 * 
 * @description 定义热力图中每天的完整数据
 * @property date - 日期（YYYY-MM-DD）
 * @property count - 活动总数（用于计算强度等级）
 * @property level - 活动强度等级（0-4）
 * @property summary - 活动摘要描述
 * @property hasDiary - 是否有日记发布
 * @property diarySlug - 日记 slug（如果有）
 * @property hasBlog - 是否有博客发布
 * @property workspaceCommits - Workspace 仓库 commit 数
 * @property blogCommits - 博客仓库 commit 数
 */
export interface HeatmapDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  summary: string
  hasDiary: boolean
  diarySlug?: string
  hasBlog?: boolean
  workspaceCommits?: number
  blogCommits?: number
}

/**
 * 解析 Frontmatter
 * 
 * @param fileContent - 文件内容
 * @returns 元数据和内容
 */
function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: any = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim()] = value
  })

  return { metadata, content }
}

/**
 * 根据活动数量计算强度等级
 * 
 * @description 将活动总数映射到 0-4 的强度等级
 * @param count - 活动总数
 * @returns 强度等级（0=无活动，4=最高强度）
 * 
 * @example
 * ```typescript
 * getLevel(0)  // 0 - 无活动
 * getLevel(3)  // 1 - 低强度
 * getLevel(7)  // 3 - 高强度
 * getLevel(15) // 4 - 最高强度
 * ```
 */
function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 10) return 3
  return 4
}

/**
 * 获取指定日期的博客文章
 * 
 * @description 统计指定日期发布的博客文章数量和标题
 * @param date - 日期（YYYY-MM-DD）
 * @returns 文章数量和标题数组
 */
function getBlogPosts(date: string): { count: number; titles: string[] } {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  
  if (!fs.existsSync(blogDir)) {
    return { count: 0, titles: [] }
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  
  let count = 0
  let titles: string[] = []
  
  files.forEach(file => {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { metadata } = parseFrontmatter(content)
    
    if (metadata.date === date) {
      count++
      if (metadata.title) {
        titles.push(`📚 ${metadata.title}`)
      }
    }
  })
  
  return { count, titles }
}

/**
 * 获取指定日期的 Git commit 数量
 * 
 * @description 通过 git log 统计指定仓库在指定日期的 commit 数
 * @param date - 日期（YYYY-MM-DD）
 * @param repoPath - 仓库路径
 * @returns commit 数量
 * 
 * @example
 * ```typescript
 * getGitCommits('2026-02-27', '/root/.openclaw/workspace')
 * // 5
 * ```
 */
function getGitCommits(date: string, repoPath: string): number {
  try {
    if (!fs.existsSync(repoPath)) {
      return 0
    }
    
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)
    
    const cmd = `cd "${repoPath}" && git log --since="${startDate.toISOString()}" --until="${endDate.toISOString()}" --oneline 2>/dev/null | wc -l`
    const result = execSync(cmd, { encoding: 'utf-8' }).trim()
    
    return parseInt(result) || 0
  } catch {
    return 0
  }
}

/**
 * 获取指定日期的日记摘要
 * 
 * @description 统计指定日期发布的日记数量和摘要
 * @param date - 日期（YYYY-MM-DD）
 * @returns 数量、摘要数组和日记 slug
 */
function getDiarySummaries(date: string): { count: number; summaries: string[]; diarySlug?: string } {
  const diaryDir = path.join(process.cwd(), 'app', 'diary', 'posts')
  const files = fs.readdirSync(diaryDir).filter(f => f.endsWith('.md'))
  
  let count = 0
  let summaries: string[] = []
  let diarySlug: string | undefined

  files.forEach(file => {
    const filePath = path.join(diaryDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { metadata } = parseFrontmatter(content)
    
    if (metadata.publishedAt === date) {
      count++
      diarySlug = file.replace('.md', '')
      if (metadata.summary) {
        summaries.push(`📝 ${metadata.summary}`)
      }
    }
  })

  return { count, summaries, diarySlug }
}

/**
 * 获取指定日期的 Memory 摘要
 * 
 * @description 从 Memory 文件中提取核心事件作为摘要
 * @param date - 日期（YYYY-MM-DD）
 * @returns 数量和摘要数组
 */
function getMemorySummaries(date: string): { count: number; summaries: string[] } {
  const memoryDir = path.join(process.cwd(), 'memory')
  const file = path.join(memoryDir, `${date}.md`)
  
  if (!fs.existsSync(file)) {
    return { count: 0, summaries: [] }
  }

  const content = fs.readFileSync(file, 'utf-8')
  const lines = content.split('\n')
  
  let summaries: string[] = []
  let inCoreEvents = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('## 🎯 核心事件')) {
      inCoreEvents = true
      continue
    }
    if (inCoreEvents && line.startsWith('###')) {
      const title = line.replace('###', '').trim()
      summaries.push(`🎯 ${title}`)
    }
    if (inCoreEvents && line.startsWith('## ') && !line.includes('核心事件')) {
      break
    }
  }

  return { count: summaries.length > 0 ? 1 : 0, summaries }
}

/**
 * 生成热力图数据
 * 
 * @description 生成指定天数范围内的热力图数据，包含所有活动类型
 * @param days - 天数（默认 365 天）
 * @returns 热力图数据数组
 * 
 * @example
 * ```typescript
 * const heatmapData = generateHeatmapData(365)
 * // [
 * //   { date: '2026-02-27', count: 5, level: 2, summary: '...', ... },
 * //   { date: '2026-02-26', count: 3, level: 1, summary: '...', ... }
 * // ]
 * ```
 */
export function generateHeatmapData(days = 365): HeatmapDay[] {
  const data: HeatmapDay[] = []
  const today = new Date()
  
  // 仓库路径
  const workspaceRepo = '/root/.openclaw/workspace'
  const blogRepo = '/home/claw/repos/zhua-zhua-blog'

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const diaryData = getDiarySummaries(dateStr)
    const memoryData = getMemorySummaries(dateStr)
    const blogData = getBlogPosts(dateStr)
    const workspaceCommits = getGitCommits(dateStr, workspaceRepo)
    const blogCommits = getGitCommits(dateStr, blogRepo)

    // 计算总活动强度：
    // - 日记发布：1 级/篇
    // - 博客文章：1 级/篇
    // - Memory 记录：1 级/天
    // - Git commit：1 级/5 次
    const gitActivity = Math.floor((workspaceCommits + blogCommits) / 5)
    const totalCount = diaryData.count + memoryData.count + blogData.count + gitActivity
    const summaries = [
      ...diaryData.summaries,
      ...memoryData.summaries,
      ...blogData.titles,
    ]
    
    // 添加 Git commit 信息到总结
    if (workspaceCommits > 0) {
      summaries.push(`💻 Workspace: ${workspaceCommits} commits`)
    }
    if (blogCommits > 0) {
      summaries.push(`📝 Blog: ${blogCommits} commits`)
    }

    data.push({
      date: dateStr,
      count: totalCount,
      level: getLevel(totalCount),
      summary: summaries.join('\n') || 'No activity',
      hasDiary: !!diaryData.diarySlug,
      diarySlug: diaryData.diarySlug,
      hasBlog: blogData.count > 0,
      workspaceCommits,
      blogCommits,
    })
  }

  return data
}
