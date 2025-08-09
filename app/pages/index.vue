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
const selectedNote = ref({});

const todayNotes = computed(() => {
return notes.value.filter( (note) => {
  const noteDate = new Date(note.updatedAt);
  return noteDate.toDateString() === new  Date().toDateString()
})
})

const yesterdayyNotes = computed(() => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1)

return notes.value.filter( (note) => {
  const noteDate = new Date(note.updatedAt);
  return noteDate.toDateString() === yesterday.toDateString()
})
})


const olderNotes = computed(() => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt)
    return (
      noteDate < yesterday &&
      noteDate.toDateString() !== yesterday.toDateString()
    )
  })
})

onMounted( async () => {
  notes.value = await $fetch('/api/notes');
  if(notes.value.length > 0) {
  selectedNote.value = notes.value[0];
  }
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
          <div v-for="note in todayNotes" :key="note.createdAt"  class="single-note flex flex-col gap-1 p-2 pointer "
          :class="[
            'rounded-lg',
            note.id === selectedNote.id 
              ? 'bg-[#a1842c]' 
              : 'hover:bg-[#a1842c]/15'
          ]"
          @click="selectedNote = note">
            <h3 class="text-sm font-bold truncate text-white">{{ note.text.substring(0, 50)}}</h3>
            <div class="meta flex gap-4 text-xs ">
              <span class="text-white ">
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
          <div v-for="note in yesterdayyNotes" :key="note.createdAt"  class="single-note flex flex-col gap-1 p-2 pointer "
          :class="[
            'rounded-lg',
            note.id === selectedNote.id 
              ? 'bg-[#a1842c]' 
              : 'hover:bg-[#a1842c]/15'
          ]"
          @click="selectedNote = note">
            <h3 class="text-sm font-bold truncate text-white">{{ note.text.substring(0, 50)}}</h3>
            <div class="meta flex gap-4 text-xs ">
              <span class="text-white ">
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


      <div v-if="olderNotes.length > 0"
      class="oldest-notes  mt-6">
        <p class="text-xs color-zinc-800">Oldest</p>
        <div class="notes-wrapper flex flex-col gap-2 today-container mt-2 pl-2">

          <div v-for="note in olderNotes" :key="note.createdAt"  class="single-note flex flex-col gap-1 p-2 pointer "
          :class="[
            'rounded-lg',
            note.id === selectedNote.id 
              ? 'bg-[#a1842c]' 
              : 'hover:bg-[#a1842c]/15'
          ]"
          @click="selectedNote = note">
            <h3 class="text-sm font-bold truncate text-white">{{ note.text.substring(0, 50)}}</h3>
            <div class="meta flex gap-4 text-xs ">
              <span class="text-white ">
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
        <p class="text-gray-300/50 font-light italic text-xs mb-2">{{ new Date(selectedNote.updatedAt).toDateString() === new Date().toDateString()
        ? 'Today'
        : new Date(selectedNote.updatedAt).toLocaleDateString('it-IT', {
    weekday: 'long', // giorno della settimana in testo
  day: '2-digit',  // giorno numerico
  month: 'long',
  year: 'numeric'
          })}}</p>
 <p class="text-gray-300/35 font-light italic mb-4" v-html="selectedNote.text"></p>
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