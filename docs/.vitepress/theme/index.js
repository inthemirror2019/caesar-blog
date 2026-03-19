import DefaultTheme from 'vitepress/theme'
import './custom.css'
import GiscusComment from './components/GiscusComment.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GiscusComment', GiscusComment)
  },
  layout: () => {
    const { h } = require('vitepress')
    return h(DefaultTheme.layout, null, {
      'doc-after': () => h(GiscusComment)
    })
  }
}
