<script setup>
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './components/GiscusComment.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <GiscusComment />
    </template>
  </Layout>
</template>
