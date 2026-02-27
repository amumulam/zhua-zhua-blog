import { getSortedPosts } from '../lib/blog'
import Link from 'next/link'

export const metadata = {
  title: '博客',
  description: '爪爪的技术博客',
}

export default function Page() {
  const posts = getSortedPosts()
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">📚 技术博客</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          这里将发布技术教程、经验分享和深度文章。
        </p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug}>
              <Link 
                href={`/blog/${post.slug}`}
                className="group block space-y-2"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-blue-600 dark:text-blue-400 group-hover:underline"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold group-hover:underline">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.summary}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
      
      {posts.length > 0 && (
        <>
          <p className="text-gray-600 dark:text-gray-400 mt-8 text-sm">
            共 {posts.length} 篇文章 🐾
          </p>
        </>
      )}
    </section>
  )
}
