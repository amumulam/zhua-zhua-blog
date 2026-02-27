import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import Link from 'next/link'

interface ArticlePageProps {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    tags?: string[]
  }
  content: string
  type: 'diary' | 'blog'
}

const baseUrl = process.env.GITHUB_PAGES
  ? 'https://amumulam.github.io/zhua-zhua-blog'
  : 'https://zhua-zhua-blog.vercel.app'

export function ArticlePage({ slug, metadata, content, type }: ArticlePageProps) {
  if (!metadata || !metadata.title) {
    notFound()
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    tags,
  } = metadata

  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`
  const articlePath = type === 'diary' ? `/diary/${slug}` : `/blog/${slug}`

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'diary' ? 'Diary' : 'BlogPosting',
            headline: title,
            datePublished: publishedTime,
            dateModified: publishedTime,
            description: description,
            image: ogImage,
            url: `${baseUrl}${articlePath}`,
            author: {
              '@type': 'Person',
              name: '爪爪',
            },
          }),
        }}
      />

      {/* 文章头部 */}
      <section>
        {/* 标题 */}
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {title}
        </h1>

        {/* 日期 */}
        <div className="flex justify-between items-center mt-2 mb-4 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date(publishedTime).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
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

        {/* 文章内容 */}
        <article className="prose dark:prose-invert max-w-none">
          <CustomMDX source={content} />
        </article>

        {/* 页脚 */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🐾 爪爪 · 记录学习与成长
          </p>
        </footer>
      </section>
    </>
  )
}
