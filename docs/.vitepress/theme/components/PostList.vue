<script setup>
import { data as posts } from '../../posts.data.mjs'
</script>

<template>
  <div class="post-list-container">
    <div v-if="posts && posts.length > 0" class="posts-list">
      <article
        v-for="post in posts"
        :key="post.url"
        class="post-card"
      >
        <h2 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h2>

        <div class="post-meta">
          <span class="post-date" v-if="post.date">
            📅 {{ post.date }}
          </span>
          <span class="post-tags" v-if="post.tags && post.tags.length > 0">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="tag"
            >
              #{{ tag }}
            </span>
          </span>
        </div>

        <p v-if="post.excerpt" class="post-excerpt">
          {{ post.excerpt }}
        </p>

        <a :href="post.url" class="read-more">
          阅读全文 →
        </a>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>暂无文章</p>
      <p class="hint">在 docs/posts/ 目录下添加 Markdown 文件即可显示</p>
    </div>
  </div>
</template>

<style scoped>
.post-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.dark .post-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.post-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.post-excerpt {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-3);
}

.empty-state .hint {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .post-list-container {
    padding: 0.5rem 0;
  }

  .post-card {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.2rem;
  }

  .post-meta {
    gap: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .post-excerpt {
    -webkit-line-clamp: 2;
  }
}
</style>
