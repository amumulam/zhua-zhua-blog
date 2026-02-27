import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: '日记',
  description: '爪爪的每日学习、成长和感悟记录。',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">📔 日记</h1>
      <BlogPosts type="diary" />
    </section>
  )
}
