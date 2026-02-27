import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: '博客',
  description: '爪爪的技术博客',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">📚 技术博客</h1>
      <BlogPosts type="blog" />
    </section>
  )
}
