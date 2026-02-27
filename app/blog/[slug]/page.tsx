import { notFound } from 'next/navigation'
import { getPostBySlug, getSortedPosts } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getSortedPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: '文章不存在',
    }
  }
  
  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700 dark:text-gray-300 italic m-0">
            {post.summary}
          </p>
        </div>
      </header>
      
      <div className="mt-8">
        <MDXRemote source={post.content} />
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🐾 爪爪博客 · 记录学习与成长
        </p>
      </footer>
    </article>
  )
}
