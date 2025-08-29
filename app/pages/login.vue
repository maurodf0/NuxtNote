<script setup lang="ts">
import Swal from 'sweetalert2';

interface User {
  email: string,
  psw: string
}

const {progress, isloading} = useLoadingIndicator();

console.log(`Loaded ${progress.value}`);

const email = ref<string>('');
const psw = ref<string>('');
const msg = ref<string>('');

const scrollToLogin = () => {
  const loginSection = document.getElementById('login-section');
  if (loginSection) {
    loginSection.scrollIntoView({ behavior: 'smooth' });
  }
}

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
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: user
    })

    console.log(response);
    msg.value = response?.message;
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
    console.log(error);
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
  <div class="bg-zinc-900">
    
    <!-- Mobile: Presentation Section - Full Height -->
    <div class="presentation-section min-h-screen bg-zinc-800 flex items-center justify-center p-6 relative md:hidden">
      <div class="max-w-2xl text-center w-full">
        <div class="mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            NuxtNote
          </h1>
          <p class="text-gray-300 text-lg mb-12 leading-relaxed">
            Your simple, powerful note-taking companion
          </p>
        </div>
        
        <div class="grid gap-8 mb-12">
          <div class="flex items-start gap-4 group text-left">
            <div class="w-4 h-4 bg-[#FFAC00] rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
            <div class="flex-1">
              <h3 class="text-gray-200 font-semibold mb-2">Write & Organize</h3>
              <p class="text-gray-400 text-sm leading-relaxed">Create, edit and organize your notes with ease</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4 group text-left">
            <div class="w-4 h-4 bg-[#FFAC00] rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
            <div class="flex-1">
              <h3 class="text-gray-200 font-semibold mb-2">Always Available</h3>
              <p class="text-gray-400 text-sm leading-relaxed">Access your notes from anywhere, anytime</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4 group text-left">
            <div class="w-4 h-4 bg-[#FFAC00] rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
            <div class="flex-1">
              <h3 class="text-gray-200 font-semibold mb-2">Fast & Secure</h3>
              <p class="text-gray-400 text-sm leading-relaxed">Built with Nuxt.js for speed and security</p>
            </div>
          </div>
        </div>

        <button
          @click="scrollToLogin"
          class="inline-flex items-center gap-3 bg-[#FFAC00] hover:bg-yellow-500 
                 text-black font-semibold py-4 px-8 rounded-full
                 transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50
                 group">
          Get Started
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </button>
      </div>


    </div>

    <!-- Desktop & Mobile Login Section -->
    <div id="login-section" class="bg-zinc-900 min-h-screen md:h-screen flex flex-col md:flex-row">

      <!-- Sidebar Form Section -->
      <div class="sidebar bg-black md:w-[30%] flex justify-center px-8 flex-col w-full min-h-screen md:min-h-0">
        <Logo class="mb-8" />
        <h1 class="text-white text-xl mb-4">Login into your account to NuxtNote</h1>
        <p class="text-sm">Don't have an account?
          <NuxtLink class="underline" to="/register">Register now for free</NuxtLink>
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
            <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
            <input 
            v-model="psw"
            type="password" 
            class="w-full bg-zinc-800 border rounded-md py-2 px-4 block placeholder:text-zinc-500 border-zinc-700">
          </div>

          <button
            type="submit"
            class="w-full flex items-center gap-4 justify-center">
            Login in <ArrowRight />
          </button>
        </form>
      </div>

      <!-- Desktop Presentation Section -->
      <div class="main bg-zinc-800 md:w-[70%] w-full flex items-center justify-center p-8 hidden md:flex">
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
  </div>
</template>