import { notFound } from 'next/navigation'
import { getPostBySlug, getSortedPosts } from '../../lib/blog'
import { CustomMDX } from 'app/components/mdx'
import Link from 'next/link'

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
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-4 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {new Date(post.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      
      {/* 标签显示 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      
      <article className="max-w-none">
        <CustomMDX source={post.content} />
      </article>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🐾 爪爪博客 · 记录学习与成长
        </p>
      </footer>
    </section>
  )
}
