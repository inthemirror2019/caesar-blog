import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import PostList from './components/PostList.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  }
}
