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
  <div class="bg-zinc-900 h-screen flex flex-col md:flex-row">

    <div class="sidebar bg-black md:w-[25%] flex justify-center px-8 flex-col w-full">
      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Write your Note everywhere</h1>
      <p class="text-sm">Don't have an account?
        <NuxtLink class="underline" to="/register">Register now for free</NuxtLink>
      </p>



    </div>
    <div class="main bg-zinc-800 md:w-[75%] w-full">
      <h1>Main</h1>
    </div>
  </div>
</template>