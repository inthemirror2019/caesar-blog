<script setup>
import { onMounted, watch, ref, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isDark = ref(false)
const commentRef = ref(null)
const loaded = ref(false)

// 更新暗黑模式状态
function updateDarkMode() {
  if (typeof window === 'undefined') return
  isDark.value = document.documentElement.classList.contains('dark')
}

// 发送主题切换消息到 Giscus iframe
function sendGiscusTheme(theme) {
  if (typeof window === 'undefined') return

  const iframe = document.querySelector('iframe.giscus-frame')
  if (!iframe) return

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
}

// 清理已存在的 Giscus 元素
function cleanupGiscus() {
  if (typeof window === 'undefined') return

  // 移除已有的 Giscus 容器和脚本
  const existingContainers = document.querySelectorAll('.giscus, .giscus-comment')
  existingContainers.forEach(el => el.remove())

  const existingScripts = document.querySelectorAll('script[src*="giscus.app"]')
  existingScripts.forEach(el => el.remove())

  loaded.value = false
}

// 加载 Giscus 脚本
function loadGiscus() {
  if (loaded.value || typeof window === 'undefined') return

  // 清理已存在的 Giscus
  cleanupGiscus()

  // 确保容器存在
  if (!commentRef.value) return

  updateDarkMode()
  loaded.value = true

  // 创建 Giscus 容器
  const giscusContainer = document.createElement('div')
  giscusContainer.className = 'giscus'
  commentRef.value.appendChild(giscusContainer)

  // 创建并加载 Giscus 脚本
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'

  // Giscus 配置
  script.setAttribute('data-repo', 'inthemirror2019/caesar-blog')
  script.setAttribute('data-repo-id', 'R_kgDORj-Mvw')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDORj-Mv84C4wwA')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')

  giscusContainer.appendChild(script)
}

// 监听暗黑模式变化
watch(isDark, (newValue) => {
  sendGiscusTheme(newValue ? 'dark' : 'light')
})

// 监听路由变化
watch(() => route.path, () => {
  nextTick(() => {
    // 延迟一点确保 DOM 已更新
    setTimeout(() => {
      loadGiscus()
    }, 100)
  })
}, { immediate: true })

onMounted(() => {
  if (typeof window === 'undefined') return

  updateDarkMode()

  // 监听主题变化
  const observer = new MutationObserver(() => {
    updateDarkMode()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<template>
  <div ref="commentRef" class="giscus-comment-wrapper">
    <div class="comment-header">
      <h3>💬 评论</h3>
      <p class="comment-hint">使用 GitHub 登录后即可发表评论</p>
    </div>
  </div>
</template>

<style scoped>
.giscus-comment-wrapper {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.comment-header {
  margin-bottom: 1.5rem;
}

.comment-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.comment-hint {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

/* Giscus 容器样式 */
.giscus-comment-wrapper :deep(.giscus) {
  width: 100%;
}

.giscus-comment-wrapper :deep(.giscus-frame) {
  width: 100% !important;
  border: none;
}
</style>
