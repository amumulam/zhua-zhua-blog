import { getBlogPosts } from 'app/diary/utils'
import Link from 'next/link'

export const metadata = {
  title: '标签',
  description: '所有日记标签',
}

export default function TagsPage() {
  const posts = getBlogPosts()
  
  // 统计所有标签
  const tagCount = new Map<string, number>()
  posts.forEach(post => {
    post.metadata.tags?.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
    })
  })
  
  // 按标签名排序
  const sortedTags = Array.from(tagCount.entries()).sort((a, b) => 
    a[0].localeCompare(b[0])
  )
  
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        所有标签
      </h1>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <Link 
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
          >
            #{tag} <span className="text-neutral-500">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
