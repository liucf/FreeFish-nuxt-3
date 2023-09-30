<template>
  <div class="bg-white dark:bg-gray-800">
    <!-- Header -->
    <div class="bg-warm-gray-50">
      <div class="py-24 lg:py-12">
        <div class="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
          <h1
            class="text-warm-gray-900 mb-10 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Mobile App
          </h1>

          Android:
          <a class="text-blue-400 underline" href="freefish.apk"
            >freefish.apk</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "About | " + useState("title").value,
});
</script>
