<template>
  <main
    class="mx-auto max-w-7xl rounded-lg bg-gray-100 pb-10 shadow-md lg:px-8 lg:py-12"
  >
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside class="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in subNavigation"
            :key="item.name"
            :href="item.href"
            :class="[
              item.slug == currentPath || item.slug == currentSlug
                ? 'bg-gray-50 text-orange-600 hover:bg-white'
                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center rounded-md border-none px-3 py-2 text-sm font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            <component
              :is="item.icon"
              :class="[
                item.slug == currentPath || item.slug == currentSlug
                  ? 'text-orange-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
              ]"
              aria-hidden="true"
            />
            <span class="truncate">{{ item.name }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Payment details -->
      <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
let currentPath = route.name;
// console.log(currentPath);

import {
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  ClipboardDocumentIcon,
  QueueListIcon,
  BanknotesIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  currentSlug: String,
  default: "",
});

const subNavigation = [
  { name: "Profile", href: "/my", icon: UserCircleIcon, slug: "my" },

  {
    name: "Password",
    href: "/my/password",
    icon: KeyIcon,
    slug: "my-password",
  },
  {
    name: "Lists",
    href: "/my/products",
    icon: QueueListIcon,
    slug: "my-products",
  },
  {
    name: "Solds",
    href: "/my/solds",
    icon: BanknotesIcon,
    slug: "my-solds",
  },
  {
    name: "Orders",
    href: "/my/orders",
    icon: ClipboardDocumentIcon,
    slug: "my-orders",
  },
];
</script>
