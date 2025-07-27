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
    </div>
    <div class="main bg-zinc-800 md:w-[70%] w-full">
      <h1>Hello Register</h1>
    </div>
  </div>
</template>