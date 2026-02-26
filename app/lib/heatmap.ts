import fs from 'fs'
import path from 'path'

interface HeatmapDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  summary: string
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

function getDiarySummaries(date: string): { count: number; summaries: string[] } {
  const diaryDir = path.join(process.cwd(), 'app', 'diary', 'posts')
  const files = fs.readdirSync(diaryDir).filter(f => f.endsWith('.md'))
  
  let count = 0
  let summaries: string[] = []

  files.forEach(file => {
    const filePath = path.join(diaryDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { metadata } = parseFrontmatter(content)
    
    if (metadata.publishedAt === date) {
      count++
      // 从 content 中提取第一段作为总结
      const firstParagraph = metadata.summary || content.split('\n')[0]?.substring(0, 50)
      if (firstParagraph) {
        summaries.push(`📝 ${firstParagraph}`)
      }
    }
  })

  return { count, summaries }
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

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const diaryData = getDiarySummaries(dateStr)
    const memoryData = getMemorySummaries(dateStr)

    const totalCount = diaryData.count + memoryData.count
    const summaries = [...diaryData.summaries, ...memoryData.summaries]

    data.push({
      date: dateStr,
      count: totalCount,
      level: getLevel(totalCount),
      summary: summaries.join('\n') || '没有学习记录',
    })
  }

  return data
}
