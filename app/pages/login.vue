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
  const response = await $fetch('/api/login', {
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
  <div class="bg-zinc-900 h-screen flex flex-col md:flex-row">

    <div class="sidebar bg-black md:w-[30%] flex justify-center px-8 flex-col w-full">
      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Login into your account to NuxtNote </h1>
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
          <label for="password" class="block mb-2 text-sm font-medium">Password</label>
          <input 
          v-model="psw"
          type="password" 
          class="w-full bg-zinc-800 border rounded-md py-2 px-4 block placeholder:text-zinc-500 border-zinc-700">
        </div>

        <button
          class="w-full flex items-center gap-4 justify-center">Login in<ArrowRight />
        </button>
      </form>

    </div>
    <div class="main bg-zinc-800 md:w-[70%] w-full">
      <h1>Main</h1>
    </div>
  </div>
</template>