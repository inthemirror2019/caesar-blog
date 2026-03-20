const fs = require('fs')
const path = require('path')

const postsDir = path.join(__dirname, '..', 'docs', 'posts')
const indexFile = path.join(postsDir, 'index.md')

// 读取所有 md 文件
function getAllPosts() {
  const files = fs.readdirSync(postsDir)
  const posts = files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const filePath = path.join(postsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const slug = file.replace(/\.md$/, '')

      // 提取日期：从文件名 YYYY-MM-DD-title.md
      let date = ''
      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})-/)
      if (dateMatch) {
        date = dateMatch[1]
      }

      // 提取标题：第一行 # Title
      const lines = content.split('\n')
      let title = slug
      if (lines[0].startsWith('# ')) {
        title = lines[0].replace(/^# /, '').trim()
      }

      // 提取标签
      let tags = []
      for (const line of lines.slice(0, 5)) {
        const tagMatch = line.match(/标签：(.*)/)
        if (tagMatch) {
          tags = tagMatch[1].trim().split(/\s+/).map(t => t.replace(/^#/, '').trim()).filter(t => t)
          break
        }
      }

      // 提取摘要
      let abstract = ''
      const parts = content.split('---')
      if (parts.length > 1) {
        abstract = parts[0].split('\n').slice(1).filter(line => line.trim() && !line.includes('标签：')).join(' ').trim()
        if (!abstract) {
          abstract = parts[1].trim().split('\n').slice(0, 2).filter(line => line.trim()).join(' ').trim()
        }
      } else {
        abstract = content.split('\n').slice(1, 3).filter(line => line.trim()).join(' ').trim()
      }
      // 截取前 120 字
      abstract = abstract.slice(0, 120) + (abstract.length > 120 ? '...' : '')

      return {
        slug,
        title,
        date,
        tags,
        abstract,
        url: `/posts/${slug}/`
      }
    })
    // 按日期倒序排序
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return b.date.localeCompare(a.date)
    })

  return posts
}

// 生成 index.md 内容
function generateIndexMarkdown(posts) {
  let md = `# 文章列表

这里是所有的技术文章，按时间倒序排列。

`

  if (posts.length === 0) {
    md += `\n> 还没有发布任何文章，敬请期待~
`
    return md
  }

  posts.forEach(post => {
    md += `### [${post.title}](${post.url})\n`
    if (post.date || post.tags.length > 0) {
      const meta = []
      if (post.date) {
        meta.push(`**发布时间：${post.date}**`)
      }
      if (post.tags.length > 0) {
        meta.push(`**标签：${post.tags.map(t => `#${t}`).join(' ')}**`)
      }
      md += `${meta.join(' · ')}` + '\n\n'
    }
    if (post.abstract) {
      md += `${post.abstract}\n\n`
    }
    md += `---\n\n`
  })

  return md
}

// 主函数
function main() {
  const posts = getAllPosts()
  const content = generateIndexMarkdown(posts)
  fs.writeFileSync(indexFile, content, 'utf-8')
  console.log(`✅ 文章列表已生成，共 ${posts.length} 篇文章`)
  posts.forEach((post, i) => {
    console.log(`   ${i + 1}. ${post.date ? post.date : '----'} - ${post.title}`)
  })
}

main()
