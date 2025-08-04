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
  <div class="bg-zinc-800 h-screen flex flex-col md:flex-row">

    <div class="sidebar bg-zinc-900 md:w-[25%] flex p-8 flex-col w-full">

      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Write your Note everywhere</h1>

      <div class="today-notes">
      <p class="text-xs color-zinc-800">Today</p>
        <div class="notes-wrapper flex flex-col gap-2 today-container mt-2 pl-2">

          <div class="single-note flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold text-white">Single note for today</h3>
            <div class="meta flex gap-4 text-xs"> 
              <span class="text-white">Today</span>
              <p>Lorem ipsum dolor sit amet sentiam ki....</p></div>
          </div>

                  <div class="single-note bg-[#a1842c] rounded-lg flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold text-white">Single note for today</h3>
            <div class="meta flex gap-4 text-xs"> 
              <span class="text-white">Today</span>
              <p>Lorem ipsum dolor sit amet sentiam ki....</p></div>
          </div>

        </div>
      </div>


            <div class="oldest-notes mt-6">
      <p class="text-xs color-zinc-800">Yesterday</p>
        <div class="notes-wrapper flex flex-col gap-2 today-container mt-2 pl-2">

          <div class="single-note flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold text-white">Single note for today</h3>
            <div class="meta flex gap-4 text-xs"> 
              <span class="text-white">Yesterday</span>
              <p>Lorem ipsum dolor sit amet sentiam ki....</p></div>
          </div>

            <div class="single-note flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold text-white">Single note for today</h3>
            <div class="meta flex gap-4 text-xs"> 
              <span class="text-white">Yesterday</span>
              <p>Lorem ipsum dolor sit amet sentiam ki....</p></div>
          </div>

        </div>
      </div>
    </div>

    <div class="main bg-black md:w-[75%] w-full">

      <div class="flex justify-between p-8 align-middle items-center">
        <button class="flex items-center gap-2 hover:text-gray-500"> 
          <Icon name="material-symbols:add" size="20"/> 
          <span>Create Note</span>
        </button>
        <button>
          <Icon name="material-symbols:delete-forever-outline" size="26" class="hover:text-gray-500"/>
        </button>
      </div>

      <div class="note max-w-lg mx-auto mt-4">
        <p class="text-gray-300/50 font-light italic">Monday - August 4 2025 </p>
        <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>

         <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>

          <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>
      </div>
     
    </div>
  </div>
</template>

