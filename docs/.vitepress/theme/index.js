import DefaultTheme from 'vitepress/theme'
import './custom.css'
import GiscusComment from './components/GiscusComment.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('GiscusComment', GiscusComment)

    // 在每次路由更新后，检查是否需要插入评论
    router.onAfterRouteChanged = () => {
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const mainContent = document.querySelector('.vp-doc')
          if (mainContent && !document.querySelector('.giscus-comment')) {
            const giscusDiv = document.createElement('div')
            giscusDiv.className = 'giscus-comment'
            mainContent.appendChild(giscusDiv)

            // 加载 Giscus 脚本
            if (!document.querySelector('script[src="https://giscus.app/client.js"]')) {
              const script = document.createElement('script')
              script.src = 'https://giscus.app/client.js'
              script.async = true
              script.crossOrigin = 'anonymous'
              script.setAttribute('data-repo', 'inthemirror2019/caesar-blog')
              script.setAttribute('data-repo-id', 'R_kgDORj-Mvw')
              script.setAttribute('data-category', 'General')
              script.setAttribute('data-category-id', 'DIC_kwDORj-Mv84C4wwA')
              script.setAttribute('data-mapping', 'title')
              script.setAttribute('data-strict', '0')
              script.setAttribute('data-reactions-enabled', '1')
              script.setAttribute('data-emit-metadata', '0')
              script.setAttribute('data-input-position', 'bottom')
              script.setAttribute('data-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
              script.setAttribute('data-lang', 'zh-CN')
              giscusDiv.appendChild(script)
            }
          }
        }, 100)
      }
    }
  }
}
