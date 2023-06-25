<template>
  <div class="bg-white">
    <LayoutHeader />
    <main>
      <NuxtPage />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">

useSeoMeta({
  title: useState<string>('title', () => 'TradeMy'),
})
</script>
