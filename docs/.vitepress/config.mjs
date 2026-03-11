import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Caesar's Blog",
  description: '技术博客，记录编程、生活和思考',
  base: '/caesar-blog/',
  appearance: 'dark',
  themeConfig: {
    siteTitle: 'Caesar\'s Blog',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/inthemirror2019' }
    ],
    footer: {
      message: 'Powered by VitePress & OpenClaw',
      copyright: '© 2026 Caesar Chu'
    },
    search: {
      provider: 'local'
    },
    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },
  markdown: {
    lineNumbers: true,
    codeCopyButtonTitle: '复制代码'
  }
})
