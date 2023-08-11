<template>
  <!-- Trending products -->
  <section aria-labelledby="trending-heading" class="bg-white dark:bg-gray-800">
    <div class="py-16">
      <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2
          id="trending-heading"
          class="text-2xl font-bold tracking-tight text-gray-900"
        >
          Trending products
        </h2>
        <a
          href="#"
          class="hidden text-sm font-semibold text-lightning-yellow-600 hover:text-lightning-yellow-500 sm:block"
        >
          See everything
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div class="mx-4 mt-8 grid grid-cols-2 gap-4 lg:mx-0 lg:grid-cols-4">
        <ProductList :products="trendingProducts.data" />
      </div>

      <div class="mt-12 px-4 sm:hidden">
        <a
          href="#"
          class="text-sm font-semibold text-lightning-yellow-600 hover:text-lightning-yellow-500"
        >
          See everything
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
let trendingProducts = ref([]);

const getTrendingProducts = async () => {
  trendingProducts.value = await useMyFetch("/api/product/trending");
};

getTrendingProducts();
</script>
