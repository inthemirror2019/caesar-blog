import DefaultTheme from 'vitepress/theme'
import './custom.css'
import GiscusComment from './components/GiscusComment.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GiscusComment', GiscusComment)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(GiscusComment)
    })
  }
}
