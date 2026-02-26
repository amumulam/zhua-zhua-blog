import { getBlogPosts } from 'app/diary/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.metadata.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).map(tag => ({ tag }))
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  return {
    title: `标签：${params.tag}`,
    description: `包含标签 "${params.tag}" 的所有日记`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getBlogPosts().filter(post => 
    post.metadata.tags?.includes(params.tag)
  )
  
  if (posts.length === 0) {
    notFound()
  }
  
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        标签：#{params.tag}
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        共 {posts.length} 篇日记
      </p>
      <div className="flex flex-col space-y-4">
        {posts.map(post => (
          <Link 
            key={post.slug}
            href={`/diary/${post.slug}`}
            className="group"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium group-hover:underline">
                  {post.metadata.title}
                </h2>
                <p className="text-sm text-neutral-500">
                  {post.metadata.publishedAt}
                </p>
              </div>
              <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
