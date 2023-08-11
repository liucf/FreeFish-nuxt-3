<template>
  <div class="py-16 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
    <div class="flex justify-around">
      <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div>
              <a href="/" class="text-gray-400 hover:text-gray-500">
                <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span class="sr-only">Home</span>
              </a>
            </div>
          </li>
          <li v-for="page in pages" :key="page.name">
            <div class="flex items-center">
              <ChevronRightIcon
                class="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                v-if="page.href != '#'"
                :href="page.href"
                class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                :aria-current="page.current ? 'page' : undefined"
                >{{ page.name }}</a
              >
              <span v-else class="ml-4 text-sm font-medium text-gray-700">{{
                page.name
              }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="ml-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <Menu as="div" class="relative inline-block">
          <div class="flex">
            <MenuButton
              class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sort by:
              {{ sortOptions.find((option) => option.value === sort).name }}
              <ChevronDownIcon
                class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem
                  v-for="option in sortOptions"
                  :key="option.name"
                  v-slot="{ active }"
                >
                  <button
                    @click="sort = option.value"
                    :class="[
                      option.current
                        ? 'font-medium text-gray-900'
                        : 'text-gray-500',
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm',
                    ]"
                  >
                    {{ option.name }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <div
      class="mx-4 my-12 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-x-0"
    >
      <ProductList :products="products.data?.data" />
    </div>

    <TailwindPagination
      class="float-right"
      :data="products?.data"
      @pagination-change-page="getResults"
      :active-classes="[
        'bg-lightning-yellow-500',
        'border-lightning-yellow-600',
        'text-white',
      ]"
    />
  </div>
</template>

<script setup>
import { TailwindPagination } from "laravel-vue-pagination";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const route = useRoute();
let sort = ref("newest");
let products = ref({});

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price Low to High", value: "priceasc" },
  { name: "Price High to Low", value: "pricedesc" },
];

import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/20/solid";

const pages = [
  {
    name: route.params.rootcategory,
    href: "/categories#" + route.params.rootcategory,
    current: false,
  },
  { name: route.params.subcategory, href: "#", current: true },
];

const getResults = async (page = 1) => {
  products.value = await useMyFetch(
    "/api/subcategory/show/" +
      route.params.subcategory +
      "?page=" +
      page +
      "&sort=" +
      sort.value,
  );
};

getResults();

watch(
  () => sort.value,
  (value) => {
    // console.log(value)
    // console.log(products.value)
    // console.log(products.value.data)
    if (value === "newest") {
      products.value.data.data = products.value.data.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (value === "priceasc") {
      products.value.data.data = products.value.data.data.sort(
        (a, b) => a.price - b.price,
      );
    } else if (value === "pricedesc") {
      products.value.data.data = products.value.data.data.sort(
        (a, b) => b.price - a.price,
      );
    }
  },
);
</script>
