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
useHead({ bodyAttrs: { class: 'h-full' }, htmlAttrs: { class: 'h-full' } })
useSeoMeta({
  title: useState<string>('title', () => 'TradeMy'),
})
</script>
