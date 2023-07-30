<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white">
    <NuxtLoadingIndicator />
    <LayoutHeader />
    <main class="bg-white dark:bg-gray-800 dark:text-white">
      <NuxtPage />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
useHead({ bodyAttrs: { class: 'h-full bg-white dark:bg-gray-800 dark:text-white' }, htmlAttrs: { class: 'h-full' } })
useSeoMeta({
  title: useState<string>('title', () => 'FreeFish'),
})
</script>
