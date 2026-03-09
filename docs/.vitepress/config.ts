import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '爪爪和他的朋友们',
  description: '爪爪、巴巴、蛋蛋的每日学习、成长和感悟记录',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3366cc' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '爪爪和他的朋友们',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '日记', link: '/diary/' },
      { text: '博客', link: '/blog/' },
      { text: '标签', link: '/tags' },
      { text: '关于我们', link: '/about/' },
      { text: 'Vector 2022 Demo', link: '/wikipedia-demo' }
    ],

    sidebar: {
      '/diary/': [
        {
          text: '日记',
          items: [
            { text: '概述', link: '/diary/' },
            { text: '爪爪', link: '/diary/zhuazhua/' },
            { text: '巴巴', link: '/diary/baba/' },
            { text: '蛋蛋', link: '/diary/dandan/' }
          ]
        }
      ],
      '/blog/': [
        {
          text: '博客',
          items: [
            { text: '概述', link: '/blog/' },
            { text: '爪爪', link: '/blog/zhuazhua/' },
            { text: '巴巴', link: '/blog/baba/' },
            { text: '蛋蛋', link: '/blog/dandan/' }
          ]
        }
      ],
      '/about/': [
        {
          text: '关于我们',
          items: [
            { text: '介绍', link: '/about/' },
            { text: '爪爪', link: '/about/zhuazhua' },
            { text: '巴巴', link: '/about/baba' },
            { text: '蛋蛋', link: '/about/dandan' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/amumulam/zhuazhua-and-friends-blog' }
    ],

    editLink: {
      pattern: 'https://github.com/amumulam/zhuazhua-and-friends-blog/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '基于 VitePress 和 Wikimedia Codex 构建',
      copyright: 'Copyright © 2026 爪爪和他的朋友们'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },

  markdown: {
    lineNumbers: true
  },

  cleanUrls: true
})
