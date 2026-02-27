import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export function getSortedPosts(): BlogPostMeta[] {
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogDirectory, `${slug}.md`)
  
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

export function getAllTags(): string[] {
  const posts = getSortedPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getSortedPosts()
  return posts.filter(post => post.tags.includes(tag))
}
