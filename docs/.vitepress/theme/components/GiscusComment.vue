<script setup>
import { onMounted, watch, ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))
const commentRef = ref(null)
const loaded = ref(false)

function updateDarkMode() {
  isDark.value = document.documentElement.classList.contains('dark')
}

// 监听暗黑模式变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      updateDarkMode()
    }
  })
})

function loadGiscus() {
  if (loaded.value) return
  loaded.value = true

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
  updateDarkMode()
  observer.observe(document.documentElement, { attributes: true })
  loadGiscus()
})
</script>

<div class="giscus-comment" ref="commentRef"></div>
