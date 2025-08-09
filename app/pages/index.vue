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

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const notes = ref([]);

onMounted( async () => {
  notes.value = await $fetch('/api/notes');
  
})
</script>

<template>
  <div class="h-screen flex flex-col md:flex-row">
    
    <!-- Sidebar -->
    <div 
      class="sidebar bg-neutral-800 md:w-[25%] flex p-8 flex-col w-full"
      :class="{ close: !sidebarOpen }"
    >
      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Write your Note everywhere</h1>

      <div class="today-notes">
        <p class="text-xs color-zinc-800">Today</p>
        <div class="notes-wrapper flex flex-col gap-2 today-container mt-2 pl-2">
          <div v-for="note in notes" class="single-note flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold truncate text-white">{{ note.text.substring(0, 50)}}</h3>
            <div class="meta flex gap-4 text-xs truncate">
              <span class="text-white truncate">
    {{
      new Date(note.updatedAt).toDateString() === new Date().toDateString()
        ? 'Today'
        : new Date(note.updatedAt).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
    }}
  </span>
              <p>{{ note.text.substring(50, 80) }}</p>
            </div>
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
              <p>Lorem ipsum dolor sit amet sentiam ki....</p>
            </div>
          </div>

          <div class="single-note flex flex-col gap-1 p-2">
            <h3 class="text-sm font-bold text-white">Single note for today</h3>
            <div class="meta flex gap-4 text-xs">
              <span class="text-white">Yesterday</span>
              <p>Lorem ipsum dolor sit amet sentiam ki....</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div 
      class="main bg-neutral-900 md:w-[75%] w-full"
      :class="{ full: !sidebarOpen }"
    >
      <div class="flex justify-between p-8 align-middle items-center">
        <button @click="createNote" class="flex items-center gap-2 hover:text-gray-500">
          <Icon name="material-symbols:add" size="20" />
          <span>Create Note</span>
        </button>
        <button>
          <Icon name="material-symbols:delete-forever-outline" size="26" class="hover:text-gray-500" />
        </button>
      </div>

      <div class="note min-h-[70vh] max-w-lg mx-auto mt-4">
        <p class="text-gray-300/50 font-light italic text-xs mb-2">Monday - August 4 2025</p>
 <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>
  <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>
   <p class="text-gray-300/35 font-light italic mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates excepturi rem nostrum, laudantium possimus consequatur dicta impedit? Nesciunt inventore ad exercitationem blanditiis omnis, eligendi ducimus officiis ut beatae vel!</p>
      </div>

      <div class="bottom-action p-8">
        <Icon 
          name="material-symbols:arrow-circle-left-rounded"
          class="pointer arrow-left"
          :class="{ rotate: !sidebarOpen }"
          size="26"
          @click="toggleSidebar"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>
.sidebar {
  transition: opacity .15s ease-in-out;
  transition: width .5s ease-in-out;


}

.sidebar.close {
  width: 0;
  padding: 0;
}

.main {
  transition: all .5s ease-in-out;
}

.arrow-left {
  transition: all .5s ease-in-out;
}

.arrow-left.rotate{
transform: rotate(180deg);
}


.main.full {
  width: 100%;
}
</style>