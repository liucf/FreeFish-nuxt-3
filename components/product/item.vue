<template>
  <div class="group relative">
    <NuxtLink :href="`/product/${product?.name}`">
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200"
      >
        <img
          :src="$getimgpath(product.thumbs[0]?.name)"
          class="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div class="mt-6">
        <!-- <p class="text-sm text-gray-500">{{ product.color }}</p> -->
        <h3 class="mt-1 font-semibold text-gray-900 dark:text-gray-100">
          {{ product.name }}
        </h3>
        <p class="mt-1 text-gray-900 dark:text-gray-100">
          <span class="line-through">${{ product.originalPrice }}</span>
          ${{ product.price }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const { $getimgpath } = useNuxtApp();
defineProps({
  product: Object,
});
</script>
