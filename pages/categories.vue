<template>
  <div class="container mx-auto flex px-4 sm:px-6">
    <aside class="sticky top-0 h-screen w-60 overflow-y-auto">
      <h2 class="py-8 text-2xl font-bold tracking-tight text-gray-900">
        All Categories
      </h2>
      <ul class="divide-y">
        <li
          v-for="category in categories.data"
          :key="category.id"
          class="cursor-pointer py-1.5 text-sm transition-all duration-300 hover:bg-lightning-yellow-500 hover:pl-6 hover:text-white"
          @click="useRouter().push('/categories#' + category.name)"
        >
          {{ category.name }}
        </li>
      </ul>
    </aside>

    <div class="ml-20 flex-1">
      <section
        v-for="category in categories.data"
        :key="category.id"
        aria-labelledby="products-heading"
      >
        <h2
          :id="`${category.name}`"
          class="pb-3 pt-8 text-xl font-semibold tracking-tight text-gray-900"
        >
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="subcategory in category.sub_category"
            :key="subcategory.name"
          >
            <NuxtLink
              :href="`/category/${category.name} /${subcategory.name}`"
              class="text-sm hover:text-primary"
              >{{ subcategory.name }}</NuxtLink
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Category | " + useState("title").value,
});

let categories = ref([]);

// let products = ref([])
// let sort = ref('newest')

// const sortOptions = [
//     { name: 'Newest', value: 'newest' },
//     { name: 'Price: Low to High', value: 'priceasc' },
//     { name: 'Price: High to Low', value: 'pricedesc' },
// ]
// const filters = [
//     {
//         id: 'category',
//         name: 'Category',
//         options: [
//             { value: 'tees', label: 'Tees' },
//             { value: 'crewnecks', label: 'Crewnecks' },
//             { value: 'hats', label: 'Hats' },
//             { value: 'bundles', label: 'Bundles' },
//             { value: 'carry', label: 'Carry' },
//             { value: 'objects', label: 'Objects' },
//         ],
//     },
//     {
//         id: 'location',
//         name: 'Location',
//         options: [
//             { value: 'new-zealand', label: 'New Zealand' },
//             { value: 'auckland', label: 'Auckland' },
//             { value: 'waikato', label: "Waikato" },
//         ],
//     }
// ]
// const mobileFiltersOpen = ref(false)

onMounted(async () => {
  categories.value = await useMyFetch("/api/category");
});

// const { data: allproducts } = await useApiFetch('/api/product')
// products.value = allproducts.value

// watch(() => sort.value, (value) => {
//     if (value === 'newest') {
//         products.value = allproducts.value
//     } else if (value === 'priceasc') {
//         products.value = allproducts.value.sort((a, b) => a.price - b.price)
//     } else if (value === 'pricedesc') {
//         products.value = allproducts.value.sort((a, b) => b.price - a.price)
//     }
// })
</script>
