# Caesar's Blog

个人技术博客，记录编程、生活和思考。

## 🌐 访问地址

https://inthemirror2019.github.io/caesar-blog/

## 🛠️ 技术栈

- **框架：** VitePress
- **部署：** GitHub Pages
- **构建工具：** npm

## ✨ 功能特性

- ✅ 极简风格，界面清爽
- ✅ 支持暗黑/亮色模式切换
- ✅ 全文搜索功能
- ✅ **Giscus 评论系统**，读者可以留言互动
- ✅ 响应式设计，支持移动端
- ✅ 代码高亮和复制功能
- ✅ 自动生成文章更新时间
- ✅ GitHub 集成

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📝 写作指南

### 1. 创建新文章

在 `docs/posts/` 目录下创建新的 Markdown 文件。

**文件名规范：** 使用小写英文，单词之间用连字符分隔，例如：
- ✅ `how-to-learn-vue.md`
- ✅ `docker-basic-tutorial.md`
- ❌ `我的文章.md`
- ❌ `HowToLearnVue.md`

### 2. 添加文章元信息（必须）

在文件开头**必须**按以下格式编写：

```markdown
# 文章标题
发布时间：YYYY-MM-DD · 标签：#标签1 #标签2
---
正文从这里开始...
```

**完整示例：**

```markdown
# VitePress 快速入门
发布时间：2026-03-19 · 标签：#前端 #VitePress #教程
---
VitePress 是一个基于 Vite 和 Vue 的静态站点生成器...
```

> 你可以直接复制上面的模板，修改成你自己的内容。

### 3. 本地预览

```bash
# 启动开发服务器
npm run dev
```

访问终端输出的地址（通常是 `http://localhost:5173/caesar-blog/`）即可预览效果，保存文件后会自动刷新。

### 4. 发布文章

1. 将修改的文件添加到 git：
   ```bash
   git add docs/posts/你的文章.md
   git commit -m "add: 新增文章标题"
   ```

2. 推送到 GitHub：
   ```bash
   git push origin main
   ```

3. 等待几分钟，GitHub Actions 会**自动构建并部署**到 GitHub Pages。

4. 部署完成后，访问 https://inthemirror2019.github.io/caesar-blog/ 就能看到新文章了。

## 📌 注意事项

- **图片存放：** 将图片放在 `docs/public/images/` 目录，引用方式：`/caesar-blog/images/图片名.jpg`
- **内部链接：** 使用绝对路径，以 `/` 开头，例如：`/caesar-blog/posts/hello-world`
- **标签格式：** 使用 `#标签名` 格式，多个标签用空格分隔
- **文章列表：** 无需手动修改 `posts/index.md`，VitePress 会自动展示所有文章

## 💬 评论功能

博客已集成 [Giscus](https://giscus.app) 评论系统，读者需要登录 GitHub 账号才能评论。所有评论存储在 GitHub Discussions 中，你会自动收到通知。

## 🔄 部署

推送代码到 main 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

---

Powered by VitePress & OpenClaw 🚀
