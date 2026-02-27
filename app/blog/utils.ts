import fs from 'fs'
import path from 'path'

/**
 * 博客文章的元数据接口
 * 
 * @description 定义博客文章 Frontmatter 中必须包含的字段
 * @property title - 文章标题
 * @property publishedAt - 发布日期（YYYY-MM-DD 格式）
 * @property summary - 文章摘要
 * @property image - 封面图片（可选）
 */
type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

/**
 * 解析 MDX/Markdown 文件的 Frontmatter
 * 
 * @description 从文件内容中提取 Frontmatter 元数据和正文内容
 * @param fileContent - 完整的文件内容（包含 Frontmatter）
 * @returns 包含元数据和正文内容的对象
 */
function parseFrontmatter(fileContent: string) {
  // 匹配 Frontmatter 块（--- 之间的内容）
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  // 逐行解析 Frontmatter
  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // 去除引号
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

/**
 * 获取目录下的所有 MDX/Markdown 文件
 * 
 * @description 递归读取目录，过滤出 .mdx 和 .md 文件
 * @param dir - 要扫描的目录路径
 * @returns 文件名数组
 */
function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => 
    path.extname(file) === '.mdx' || path.extname(file) === '.md'
  )
}

/**
 * 读取并解析单个 MDX/Markdown 文件
 * 
 * @description 读取文件内容并解析 Frontmatter
 * @param filePath - 文件完整路径
 * @returns 包含元数据和正文内容的对象
 */
function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

/**
 * 获取目录下所有文章的数据
 * 
 * @description 批量读取目录下所有 MDX 文件，返回包含元数据、slug 和内容的数组
 * @param dir - 文章目录路径
 * @returns 文章数据数组
 */
function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

/**
 * 获取所有博客文章
 * 
 * @description 从日记目录读取所有文章数据（注意：当前路径指向日记目录）
 * @returns 博客文章数组
 */
export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'diary', 'posts'))
}

/**
 * 格式化日期显示
 * 
 * @description 将日期字符串格式化为可读格式，支持相对时间显示
 * @param date - 日期字符串（YYYY-MM-DD 或 ISO 格式）
 * @param includeRelative - 是否包含相对时间（如 "3d ago"）
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  // 计算时间差
  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  // 根据时间差选择显示格式
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  // 完整日期格式
  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
