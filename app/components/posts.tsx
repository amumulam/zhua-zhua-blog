import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/diary/utils'
import { getSortedPosts } from 'app/lib/blog'

interface BlogPostsProps {
  type?: 'diary' | 'blog'
}

export function BlogPosts({ type = 'diary' }: BlogPostsProps) {
  let allPosts = type === 'diary' 
    ? getBlogPosts().map(post => ({
        slug: String(post.slug || ''),
        title: String(post.metadata.title || ''),
        publishedAt: String(post.metadata.publishedAt || ''),
        tags: Array.isArray(post.metadata.tags) ? post.metadata.tags : [],
      }))
    : getSortedPosts().map(post => ({
        slug: String(post.slug || ''),
        title: String(post.title || ''),
        publishedAt: String(post.date || ''),
        tags: Array.isArray(post.tags) ? post.tags : [],
      }))

  return (
    <div>
      {allPosts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={type === 'diary' ? `/diary/${post.slug}` : `/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
