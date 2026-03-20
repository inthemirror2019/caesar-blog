<script setup>
import { onMounted, watch, ref } from 'vue'
import { inBrowser } from 'vitepress'

const isDark = ref(false)
const commentRef = ref(null)
const loaded = ref(false)
let observer = null

function updateDarkMode() {
  if (!inBrowser) return
  isDark.value = document.documentElement.classList.contains('dark')
}

function loadGiscus() {
  if (loaded.value || !inBrowser) return
  loaded.value = true

  updateDarkMode()
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
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  commentRef.value.appendChild(script)
}

watch(isDark, () => {
  if (!inBrowser) return
  const iframe = document.querySelector('.giscus-frame')
  if (!iframe) return
  const theme = isDark.value ? 'dark' : 'light'
  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: theme
        }
      }
    },
    'https://giscus.app'
  )
})

onMounted(() => {
  if (!inBrowser) return
  updateDarkMode()
  // 监听暗黑模式变化
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateDarkMode()
      }
    })
  })
  observer.observe(document.documentElement, { attributes: true })
  loadGiscus()
})
</script>

<div class="giscus-comment" ref="commentRef"></div>
