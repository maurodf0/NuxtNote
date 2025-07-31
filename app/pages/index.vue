<script setup lang="ts">
  useHead({
    title: 'NuxtNote | Your Personal Note-Taking App made with Nuxt',
    meta: [
      { name: 'description', content: 'NuxtNote' },
    ],
  })

definePageMeta({
  middleware: ['token']
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">Hello World</h1>
  </div>
</template>