<template>
    <!-- Trending products -->
    <section aria-labelledby="trending-heading" class="bg-white dark:bg-gray-800">
        <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:py-32 lg:px-8">
            <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                <h2 id="trending-heading" class="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
                <a href="#"
                    class="hidden text-sm font-semibold text-lightning-yellow-600 hover:text-lightning-yellow-500 sm:block">
                    See everything
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>



            <div class="mt-8 mx-4 lg:mx-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ProductList :products="trendingProducts.data" />
            </div>



            <div class="mt-12 px-4 sm:hidden">
                <a href="#" class="text-sm font-semibold text-lightning-yellow-600 hover:text-lightning-yellow-500">
                    See everything
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>

let trendingProducts = ref([])

const getTrendingProducts = async () => {
    trendingProducts.value = await useMyFetch('/api/product/trending')
}

getTrendingProducts();

</script>