import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  includeSrc: true,
  transform(rawData) {
    // Debug: log the first page to understand the data structure
    if (rawData.length > 0) {
      console.log('First page keys:', Object.keys(rawData[0]))
      console.log('First page frontmatter:', rawData[0].frontmatter)
      console.log('First page url:', rawData[0].url)
      console.log('First page src exists:', !!rawData[0].src)
      console.log('First page content exists:', !!rawData[0].content)
    }

    return rawData
      .filter(page => {
        // 排除 index.md
        const filename = page.url.split('/').pop()
        return filename && filename !== 'index'
      })
      .map(page => {
        const filename = page.url.split('/').pop()
        // 获取页面源代码 - VitePress可能使用不同的属性名
        const src = page.src || page.content || ''

        // 从文件名提取日期
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/)
        let date = dateMatch ? dateMatch[1] : ''

        // 如果文件名没有日期，尝试从内容中提取
        if (!date && src) {
          const contentDateMatch = src.match(/发布时间[:：]\s*(\d{4}-\d{2}-\d{2})/)
          if (contentDateMatch) {
            date = contentDateMatch[1]
          }
        }

        // 从 frontmatter 获取标题 - VitePress的frontmatter在page.frontmatter中
        let title = '无标题'
        if (page.frontmatter && page.frontmatter.title) {
          title = page.frontmatter.title
        } else if (src) {
          const extractedTitle = extractTitle(src)
          if (extractedTitle) {
            title = extractedTitle
          }
        }

        // 提取标签
        const tags = (page.frontmatter && page.frontmatter.tags) ? page.frontmatter.tags : (src ? extractTags(src) : [])

        // 获取摘要 - 优先从src提取纯文本摘要，避免HTML
        let excerpt = ''
        if (src) {
          excerpt = extractExcerpt(src)
        }
        // 如果提取失败且有page.excerpt，尝试清理HTML标签
        if (!excerpt && page.excerpt) {
          excerpt = stripHtml(page.excerpt)
        }

        // 修复 URL：确保包含基础路径 /caesar-blog/
        let url = page.url
        // VitePress的url格式为 /posts/filename.html
        // 需要确保链接正确指向 /caesar-blog/posts/filename.html
        if (url && !url.startsWith('/caesar-blog')) {
          url = '/caesar-blog' + (url.startsWith('/') ? url : '/' + url)
        }

        return {
          title,
          date,
          tags,
          excerpt,
          url,
          src
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }
})

// 从 Markdown 内容提取标题
function extractTitle(src) {
  if (!src) return ''
  const match = src.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

// 从 Markdown 内容提取标签
function extractTags(src) {
  if (!src) return []
  const match = src.match(/标签：(.+?)(?:\n|$)/)
  if (!match) return []

  return match[1]
    .trim()
    .split(/\s+/)
    .filter(tag => tag.startsWith('#'))
    .map(tag => tag.slice(1))
}

// 从 Markdown 内容提取摘要
function extractExcerpt(src) {
  if (!src) return ''
  // 找到 --- 分隔线后的内容
  const parts = src.split(/^---\s*$/m)
  if (parts.length < 2) return ''

  const content = parts[1] || parts[0]

  // 取第一段非空文本作为摘要（最多150字符）
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('!['))
  if (lines.length === 0) return ''

  const excerpt = lines[0].trim()
  return excerpt.length > 150 ? excerpt.slice(0, 150) + '...' : excerpt
}

// 去除 HTML 标签
function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150) + (html.length > 150 ? '...' : '')
}
