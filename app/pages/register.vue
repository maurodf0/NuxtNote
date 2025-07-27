<script setup lang="ts">


</script>

<template>
  <div class="bg-black h-screen flex flex-col md:flex-row">

    <div class="sidebar bg-zinc-900 md:w-[30%] flex justify-center px-8 flex-col w-full">
      <Logo class="mb-8" />
      <h1 class="text-white text-xl mb-4">Sign Up to NuxtNote for Free</h1>
      <p class="text-sm">Already have an account?
        <NuxtLink class="underline" to="/login">Login to your account</NuxtLink>
      </p>

      <form class="flex flex-col gap-1 mt-8">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
          <input 
          id="email" 
          type="email"  
          placeholder="markred@gmail.com"
          class="bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 block w-full placeholder:text-zinc-500">
        </div>
        
        <div class="mt-4">
          <label for="password" class="block mb-2 text-sm font-medium">Password</label>
          <input 
          type="password" 
          for="password"
          class="w-full bg-zinc-800 border rounded-md py-2 px-4 block placeholder:text-zinc-500 border-zinc-700">
        </div>

        <button
          class="w-full flex items-center gap-4 justify-center">Sign Up <ArrowRight />
        </button>
      </form>

    </div>
    <div class="main bg-zinc-800 md:w-[70%] w-full">
      <h1>Hello Register</h1>
    </div>
  </div>
</template>