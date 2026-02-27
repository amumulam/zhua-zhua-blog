import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

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

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 10) return 3
  return 4
}

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
      // 从 content 中提取第一段作为总结
      const firstParagraph = metadata.summary || content.split('\n')[0]?.substring(0, 50)
      if (firstParagraph) {
        summaries.push(`📝 ${firstParagraph}`)
      }
    }
  })

  return { count, summaries, diarySlug }
}

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

    // 计算总活动强度：日记 + Memory + 博客 + Git commits（每 5 次算 1 个活动）
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
