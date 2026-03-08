import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './style.css'

export default {
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // 可以在这里注册全局组件
  }
} as Theme
