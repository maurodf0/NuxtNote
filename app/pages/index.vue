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

const sidebarOpen = ref<boolean>(true)
const updatedNote = ref<string>('');
const loader = ref<boolean>(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const notes = ref([]);
const selectedNote = ref({});

const todayNotes = computed(() => {
return notes.value.filter( (note) => {
  const noteDate = new Date(note.updatedAt);
  return noteDate.toDateString() === new  Date().toDateString()
}).sort( (a, b) =>  new Date(b.updatedAt) - new Date(a.updatedAt))
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
  updatedNote.value = selectedNote.value.text
  }
})

const debouncedFn = useDebounceFn(async() => {
   await updateNote()
}, 1000)


const updateNote = async () => {
  try {
    loader.value = true;
    const res = await $fetch(`api/notes/${selectedNote.value.id}`, {
      method: 'PATCH',
      body: {
        updatedNote: updatedNote.value,
        noteId: selectedNote.value.id
      }
    })

    if(res){
      setTimeout( () => {
        loader.value = false;
      }, 1200);
    }
  
  } catch(err) {
    console.log(err);
  }
}

const createNote = async () => {
  try {
  const newNote = await $fetch('api/notes', {
    method: 'POST',
  })
  notes.value.unshift(newNote);
  selectedNote.value = notes.value[0];
  updateNote.value = ''
  } catch(err){
    console.log(err)
  }


}
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
            @click=" () => {
              selectedNote = note
              updatedNote = note.text
            }">
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
           @click=" () => {
              selectedNote = note
              updatedNote = note.text
            }">
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
         @click=" () => {
              selectedNote = note
              updatedNote = note.text
            }">
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
      class="main bg-neutral-900 md:w-[75%] w-full flex flex-col justify-between"
      :class="{ full: !sidebarOpen }"
    >
      <div class="h-[10vh] flex justify-between p-8 align-middle items-center">
        <button @click="createNote" class="flex items-center gap-2 hover:text-gray-500">
          <Icon name="material-symbols:add" size="20" />
          <span>Create Note</span>
        </button>
        <button>
          <Icon name="material-symbols:delete-forever-outline" size="26" class="hover:text-gray-500" />
        </button>
      </div>

      <div class="note max-w-lg w-full mx-auto mt-4 h-[70vh]">
        <p class="text-gray-300/50 font-light italic text-xs mb-2">{{ new Date(selectedNote.updatedAt).toDateString() === new Date().toDateString()
        ? 'Today'
        : new Date(selectedNote.updatedAt).toLocaleDateString('it-IT', {
    weekday: 'long', // giorno della settimana in testo
  day: '2-digit',  // giorno numerico
  month: 'long',
  year: 'numeric'
          })}}</p>
 <textarea 
v-model="updatedNote"
 name="note" id="note" 
 class="text-gray-300/50 font-light h-full flex-grow focus:outline-none italic mb-4 bg-transparent w-full"
 @input="debouncedFn">
{{ selectedNote.text }}</textarea>
      
</div>

      <div class="bottom-action p-8 flex justify-between h-[10vh]">
        <Icon 
          name="material-symbols:arrow-circle-left-rounded"
          class="pointer arrow-left"
          :class="{ rotate: !sidebarOpen }"
          size="26"
          @click="toggleSidebar"
        />


  <div v-if="loader"
  class="text-gray-500 flex gap-2"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg> Saving your note...
  </div>

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