<script setup lang="ts">
import Swal from 'sweetalert2';

interface User {
  email: string,
  psw: string
}

  const email = ref<string>('');
  const psw = ref<string>('');
  const msg = ref<string>('');


const handleSubmit = async () => {
  if(!email.value || !psw.value) {
    alert('You have to provide email and password for register');
    return ;
  }
  const user: User = {
    email: email.value,
    psw: psw.value
  }

  try {
  const response = await $fetch('/api/user', {
    method: 'POST',
    body: user
  })

  console.log(response);
  msg.value = response.message;
  email.value = '';
  psw.value = '';

const { isConfirmed } = await Swal.fire({
    title: 'Success',
    text: msg.value,
    icon: 'success',
    confirmButtonText: 'Yaaaay'
  })

  if(isConfirmed){
    navigateTo('/');
  }
}
 catch (error){
  console.log(error.response?._data.message)
  Swal.fire({
    title: 'Error',
    text: error.response?._data.message,
    icon: 'error',
    confirmButtonText: 'Fine, let\'s resolve this'
  })
}
}
</script>

<template>
  <div class="bg-black h-screen flex flex-col md:flex-row">

    <div class="sidebar bg-black md:w-[30%] flex justify-center px-8 flex-col w-full">
      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Sign Up to NuxtNote for Free</h1>
      <p class="text-sm">Already have an account?
        <NuxtLink class="underline" to="/login">Login to your account</NuxtLink>
      </p>

      <form 
        class="flex flex-col gap-1 mt-8"
        @submit.prevent="handleSubmit">
        <div>
          <label           
          for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
          <input 
          id="email" 
          v-model="email"
          type="email"  
          placeholder="markred@gmail.com"
          class="bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 block w-full placeholder:text-zinc-500">
        </div>
        
        <div class="mt-4">
          <label for="password" class="block mb-2 text-sm font-medium">Password</label>
          <input 
          v-model="psw"
          type="password" 
          class="w-full bg-zinc-800 border rounded-md py-2 px-4 block placeholder:text-zinc-500 border-zinc-700">
        </div>

        <button
          class="w-full flex items-center gap-4 justify-center">Sign Up <ArrowRight />
        </button>
      </form>

    </div>
 <!-- Presentation Section -->
    <div class="main bg-zinc-800 md:w-[70%] w-full flex items-center justify-center p-8">
      <div class="max-w-xl text-center">
        <h1 class="text-gray-100">NuxtNote</h1>
        <p class="text-gray-300 text-lg mb-8">
          Your simple, powerful note-taking companion
        </p>
        
        <div class="space-y-6 text-left">
          <div class="flex items-start gap-4">
            <div class="w-2 h-2 bg-[#FFAC00] rounded-full mt-3 flex-shrink-0"></div>
            <div>
              <h3 class="text-gray-200 font-medium mb-1">Write & Organize</h3>
              <p class="text-gray-400 text-sm">Create, edit and organize your notes with ease</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-2 h-2 bg-[#FFAC00] rounded-full mt-3 flex-shrink-0"></div>
            <div>
              <h3 class="text-gray-200 font-medium mb-1">Always Available</h3>
              <p class="text-gray-400 text-sm">Access your notes from anywhere, anytime</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-2 h-2 bg-[#FFAC00] rounded-full mt-3 flex-shrink-0"></div>
            <div>
              <h3 class="text-gray-200 font-medium mb-1">Fast & Secure</h3>
              <p class="text-gray-400 text-sm">Built with Nuxt.js for speed and security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>