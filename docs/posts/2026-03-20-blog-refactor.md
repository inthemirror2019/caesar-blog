# VitePress 博客重构实录：踩坑与收获

发布时间：2026-03-20 · 标签：#vitepress #vue #前端 #踩坑

---

今天花了半天时间重构博客的首页和评论系统，本以为是个简单的任务，没想到踩了一连串的坑。记录下来，给后来的同学做个参考。

## 目标

1. 首页从静态介绍改为直接显示文章列表
2. 把评论框从文章上方移到下方
3. 确保不同文章的评论是隔离的

听起来很简单，对吧？然而...

## 坑一：ContentLoader 读不到内容

VitePress 提供了 `createContentLoader` 来批量读取 Markdown 文件，我以为是这样的：

```javascript
export default createContentLoader('posts/*.md', {
  excerpt: true
})
```

结果发现 `page.src` 是 `undefined`。翻了半天文档才发现，VitePress 默认不会读取文件内容，需要显式开启：

```javascript
export default createContentLoader('posts/*.md', {
  excerpt: true,
  includeSrc: true  // 关键！
})
```

## 坑二：HTML 实体编码坑死人

写了个 `extractTitle` 函数，用正则匹配 Markdown 的 `# 标题`，结果死活匹配不到。

debug 了半天，发现代码文件里的 `&&` 被编码成了 `&amp;&amp;`。

原来是我之前在某个地方复制粘贴时，经过了 HTML 编码。这种坑最难发现，因为肉眼看起来是对的，但解析器不认。

## 坑三：.mjs 扩展名问题

Node.js 的 ESM 模块系统是个谜。

`posts.data.js` 文件，VitePress 死活加载不了，报错信息大概是 `require() of ES Module not supported`。

试了各种办法，最后发现只要把扩展名改成 `.mjs` 就解决了：

```
posts.data.js   →  posts.data.mjs
```

这就行了。没有改任何配置，没有改任何代码，就是改了个扩展名。

## 坑四：文章链接 404

终于把首页的文章列表显示出来了，标题、日期、标签都对。兴冲冲地点了一下"阅读全文"——404。

检查生成的 URL，发现是 `/posts/filename.html`，但 VitePress 配置了 `base: '/caesar-blog/'`，所以正确的 URL 应该是 `/caesar-blog/posts/filename.html`。

修复方法是在 `posts.data.mjs` 中生成 URL 时加上 base 路径：

```javascript
let url = page.url
if (url && !url.startsWith('/caesar-blog')) {
  url = '/caesar-blog' + (url.startsWith('/') ? url : '/' + url)
}
```

## 坑五：Giscus 评论不隔离

最后一个坑，也是最隐蔽的一个。

把评论框从上方移到下方很简单，用 VitePress 的 `doc-after` 插槽就行。但问题是：所有文章共享同一个评论区。

在 Hello World 文章下发表评论，然后打开另一篇文章，评论还在那里。

查了一下 Giscus 的文档，`data-mapping` 参数控制如何关联评论：

- `pathname` - 基于页面路径
- `url` - 基于完整 URL
- `title` - 基于页面标题
- `og:title` - 基于 Open Graph 标题
- `specific` - 指定特定值

我一开始以为是 `pathname` 和 `url` 的区别，试了不行。后来发现需要在 `data-mapping="pathname"` 的同时，额外设置 `data-term` 属性来明确指定页面的唯一标识：

```javascript
script.setAttribute('data-mapping', 'pathname')
script.setAttribute('data-term', window.location.pathname)
```

这样每篇文章就有了独立的评论区。

## 收获与总结

折腾了大半天，终于把博客改造完成了。总结一下几个关键点：

1. **VitePress 的内容加载**：`createContentLoader` 默认不读取文件内容，需要显式设置 `includeSrc: true`
2. **ESM 模块的坑**：遇到模块加载问题，试试把 `.js` 改成 `.mjs`
3. **路径处理**：VitePress 的 `base` 配置会影响所有 URL，生成链接时需要考虑
4. **Giscus 评论隔离**：`data-mapping="pathname"` 配合 `data-term` 可以实现每篇文章独立评论

技术栈在变，工具在变，但折腾的精神永远不变。

二十年前为 LAMP 环境头疼的那个少年，二十年后在 VitePress 和 GitHub Actions 里找到了同样的乐趣。

希望下一个二十年，还能继续折腾。

---

*本文使用 OpenClaw 智能助手协助撰写*
