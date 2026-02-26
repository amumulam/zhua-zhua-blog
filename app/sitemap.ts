import { getBlogPosts } from 'app/diary/utils'

export const baseUrl = 'https://zhua-zhua-portfolio.vercel.app'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/diary/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/diary'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
