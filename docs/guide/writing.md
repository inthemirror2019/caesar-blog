# 写作指南

本文档详细介绍如何在这个博客中创建并发布一篇新文章。

## 📋 前置要求

- 博客基于 [VitePress](https://vitepress.dev/) 构建
- 文章使用 Markdown 格式编写
- 所有文章存放在 `docs/posts/` 目录下

---

## 🚀 快速开始：五步发布一篇文章

### 第一步：创建文章文件

#### 文件名规范

文章文件必须放在 `docs/posts/` 目录下，文件名格式为：

```
YYYY-MM-DD-文章标题.md
```

**示例：**
- `2024-01-15-vitepress-tutorial.md` ✅
- `2024-01-15-my-first-post.md` ✅
- `my-post.md` ❌（缺少日期）
- `2024-01-15_我的文章.md` ❌（使用下划线，应该用连字符）

> 💡 为什么要加日期？方便按时间排序，也避免文件名冲突。

#### 创建文件

```bash
cd docs/posts
touch 2024-01-15-your-article-title.md
```

### 第二步：编写文章内容

复制下面的模板，填写你的内容：

```markdown
---
title: 文章标题
date: 2024-01-15
tags: [标签1, 标签2]
abstract: 这里写文章摘要，会在列表页显示，控制在 100-200 字左右。
---

这里开始写你的正文...

<!-- more -->

更多内容...
```

**frontmatter 说明：**

| 字段 | 说明 | 是否必填 |
|------|------|----------|
| `title` | 文章标题 | ✅ 必填 |
| `date` | 发布日期（格式 `YYYY-MM-DD`） | ✅ 必填 |
| `tags` | 标签数组，方便分类检索 | ⭕ 可选 |
| `abstract` | 文章摘要，在列表页展示 | ⭕ 可选 |

> 💡 如果不写 `abstract`，VitePress 会自动截取文章开头部分。

### 第三步：插入图片（可选）

#### 图片存放位置

文章用到的图片放在 `public/images/` 目录下，可以按日期或者文章标题建子目录：

```
public/images/2024-01-15/xxx.png
public/images/my-article/xxx.png
```

#### 图片链接写法

```markdown
![图片描述](/images/你的图片路径.png)
```

**示例：**
```markdown
![截图示例](/images/2024-01-15/screenshot.png)
```

> ⚠️ 链接必须以 `/` 开头，这是 VitePress 静态资源路径要求。

### 第四步：本地预览

在项目根目录运行：

```bash
npm run dev
```

然后打开浏览器访问 `http://localhost:5173/`，找到你的文章就能预览效果。

> 💡 修改保存后，浏览器会自动热更新，即时看到效果。

### 第五步：发布文章

有两种发布方式，推荐使用**一键发布**。

#### 🎯 方式一：一键发布（Windows）

双击项目根目录的 `deploy.bat` 文件，脚本会自动完成提交、推送全过程。

如果脚本执行成功，等待 GitHub Actions 自动部署即可（一般 1-2 分钟）。

#### 🔧 方式二：手动发布

如果你喜欢用命令行，三步搞定：

```bash
git add .
git commit -m "add: 新增文章 - 文章标题"
git push
```

推送完成后，同样等待 GitHub Actions 自动部署。

---

## ✅ 部署完成后

部署完成后，访问你的博客网址就能看到新文章了 🎉

读者可以在文章底部通过 Giscus 评论系统发表评论，你会在 GitHub 收到通知。

---

## 📝 完整文章模板

直接复制使用：

```markdown
---
title: 在这里写文章标题
date: YYYY-MM-DD
tags: [技术, 分享]
abstract: 在这里写文章摘要，简单介绍一下这篇文章讲什么，让读者快速了解内容。
---

这里是文章正文的开头部分...

<!-- more -->

## 第一节

这里是正文内容...

## 第二节

更多内容...

### 代码示例

```js
console.log('Hello, World!');
```

### 图片示例

![描述](/images/YYYY-MM-DD/your-image.png)

## 结语

总结一下...
```

---

## ❓ 常见问题

### Q: 部署后看不到新文章？

A: 检查以下几点：
1. 文件是否放在 `docs/posts/` 目录下？
2. 文件名是否以 `.md` 结尾？
3. frontmatter 中的 `date` 格式是否正确？
4. 查看 GitHub Actions 是否运行失败，如有失败需要看日志修复。

### Q: 图片不显示？

A: 检查：
1. 图片是否放在 `public/` 目录下？
2. 图片链接是否以 `/` 开头？
3. 路径是否正确？

正确：`![](/images/xxx.png)` ✅
错误：`![](public/images/xxx.png)` ❌

### Q: deploy.bat 双击没反应？

A: 打开命令提示符（cmd），手动运行试试，看错误信息：
```bash
cd E:\claude_code\myblog\caesar-blog
deploy.bat
```

常见原因：
- 没有网络连接
- git 没有配置用户名/邮箱
- git 认证失败

### Q: 可以修改已发布的文章吗？

A: 当然可以！直接修改文件，然后重新运行一键发布（或手动 git 三步）即可，会自动更新。

### Q: 支持哪些 Markdown 语法？

A: 支持标准 CommonMark 语法，额外支持：
- 表格
- 代码块高亮
- 数学公式（如果开启）
- 容器提示框

VitePress 语法参考：https://vitepress.dev/guide/markdown

### Q: 如何添加标签？

A: 在 frontmatter 的 `tags` 数组里添加即可，多个标签用逗号分隔：
```yaml
tags: [JavaScript, VitePress, 前端]
```

### Q: 评论怎么没显示？

A: Giscus 评论只在文章页面显示，如果你创建的是普通页面（非文章）不会显示。如果是文章但不显示，检查：
1. 是否正确配置了 Giscus 参数（在 `GiscusComment.vue` 中）
2. GitHub Discussions 是否在你的仓库启用了
3. Giscus App 是否添加到了你的仓库

---

## 📂 项目目录结构参考

```
caesar-blog/
├── docs/
│   ├── posts/          # 所有文章放在这里
│   │   ├── 2024-01-01-xxx.md
│   │   └── 2024-01-02-yyy.md
│   ├── guide/          # 指南文档放在这里
│   │   └── writing.md  # 你现在看的这篇
│   ├── .vitepress/
│   │   ├── theme/
│   │   │   ├── components/
│   │   │   │   └── GiscusComment.vue  # 评论组件
│   │   │   ├── custom.css
│   │   │   └── index.js
│   │   └── config.mjs
│   └── index.md        # 首页
├── public/
│   └── images/         # 图片资源放在这里
│       ├── 2024-01-01/
│       └── 2024-01-02/
├── deploy.bat          # Windows 一键部署脚本
├── package.json
└── README.md
```

---

## 💡 写作技巧

1. **摘要不要太长**：列表页显示空间有限，摘要控制在 1-2 句话，100 字左右最好。
2. **善用标签**：相关文章用相同标签，方便读者发现更多内容。
3. **图片压缩**：上传前先压缩图片，加快加载速度，可以用 [TinyPNG](https://tinypng.com/) 在线压缩。
4. **本地预览**：发布前一定要本地预览，检查格式和图片是否正常。
5. **多提交**：写一半也可以提交，GitHub Actions 支持增量部署。

---

## 🎯 评论系统

本博客使用 [Giscus](https://giscus.app/) 提供评论功能，特点：

- ✅ 完全免费，开源无广告
- ✅ 基于 GitHub Discussions，数据存放在你的仓库
- ✅ 支持 Markdown 和代码高亮
- ✅ 自动适配暗黑/明亮模式
- ✅ 需要登录 GitHub 才能评论，有效减少垃圾评论

读者评论后，你会在 GitHub 收到邮件通知。
