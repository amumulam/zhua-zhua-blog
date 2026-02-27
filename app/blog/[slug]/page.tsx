import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from 'app/lib/blog'
import { ArticlePage } from 'app/components/article-page'

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
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

export default async function BlogArticle({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <ArticlePage
      slug={post.slug}
      metadata={{
        title: post.title,
        publishedAt: post.date,
        summary: post.summary,
        tags: post.tags,
      }}
      content={post.content}
      type="blog"
    />
  )
}
