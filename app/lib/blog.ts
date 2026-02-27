import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * 博客文章完整数据接口
 * 
 * @description 包含文章的所有信息（元数据 + 内容）
 * @property slug - 文章 slug（文件名）
 * @property title - 文章标题
 * @property date - 发布日期
 * @property tags - 标签数组
 * @property summary - 文章摘要
 * @property content - 文章正文内容
 */
export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  content: string
}

/**
 * 博客文章元数据接口
 * 
 * @description 仅包含文章的元数据（用于列表页）
 * @property slug - 文章 slug
 * @property title - 文章标题
 * @property date - 发布日期
 * @property tags - 标签数组
 * @property summary - 文章摘要
 */
export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

/**
 * 获取所有文章并按日期排序
 * 
 * @description 读取博客目录下所有文章，按发布日期倒序排列
 * @returns 按日期排序的文章元数据数组
 * 
 * @example
 * ```typescript
 * const posts = getSortedPosts()
 * // [
 * //   { slug: '2026-02-27', title: '...', date: '2026-02-27', ... },
 * //   { slug: '2026-02-26', title: '...', date: '2026-02-26', ... }
 * // ]
 * ```
 */
export function getSortedPosts(): BlogPostMeta[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const fileNames = fs.readdirSync(blogDirectory)
  
  const allPosts = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: data.tags as string[] || [],
        summary: data.summary as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return allPosts
}

/**
 * 根据 slug 获取单篇文章
 * 
 * @description 读取指定 slug 的文章完整内容
 * @param slug - 文章 slug（文件名不含扩展名）
 * @returns 文章完整数据，如果不存在则返回 null
 * 
 * @example
 * ```typescript
 * const post = await getPostBySlug('2026-02-27')
 * // { slug: '2026-02-27', title: '...', content: '...', ... }
 * ```
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: data.tags as string[] || [],
    summary: data.summary as string,
    content,
  }
}

/**
 * 获取所有标签
 * 
 * @description 收集所有文章中的标签，去重并排序
 * @returns 所有标签的数组
 * 
 * @example
 * ```typescript
 * const tags = getAllTags()
 * // ['OpenClaw', 'GitHub', '部署', ...]
 * ```
 */
export function getAllTags(): string[] {
  const posts = getSortedPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  
  return Array.from(tagsSet).sort()
}

/**
 * 根据标签筛选文章
 * 
 * @description 获取包含指定标签的所有文章
 * @param tag - 要筛选的标签
 * @returns 包含该标签的文章元数据数组
 * 
 * @example
 * ```typescript
 * const posts = getPostsByTag('GitHub')
 * // 所有包含 'GitHub' 标签的文章
 * ```
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getSortedPosts()
  return posts.filter(post => post.tags && post.tags.includes(tag))
}
