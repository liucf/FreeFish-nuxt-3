<template>
  <section>
    <p class="bg-red-500">This page will be displayed at the /about route.</p>
    <Counter />
    <img class="rounded-xl" src="/man.jpeg" alt="man">
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About | ' + useState('title').value
})
</script>