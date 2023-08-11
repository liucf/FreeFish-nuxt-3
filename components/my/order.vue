<template>
  <NuxtLink
    :href="`/my/${url}/${order.product.id}`"
    class="block hover:bg-gray-50"
  >
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex min-w-0 flex-1 items-center">
        <div class="flex-shrink-0">
          <img
            class="h-24 w-24 rounded-sm"
            :src="$getimgpath(order.product.thumbs[0]?.name)"
            alt=""
          />
        </div>
        <div class="ml-4 flex min-w-0 flex-1 justify-between px-4">
          <div>
            <p class="truncate text-sm font-medium text-primary">
              {{ order.product.name }}
            </p>
            <p class="mt-2 flex items-center text-sm text-gray-500">
              <span class="truncate">${{ order.amount }}</span>
            </p>
          </div>
          <div class="texr mr-4 hidden md:block">
            <div class="flex flex-col items-end">
              <p class="text-sm text-gray-900">
                <time :datetime="order.created_at">{{
                  dayjs(order.created_at).fromNow()
                }}</time>
              </p>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                <CheckCircleIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                  aria-hidden="true"
                />
                {{ order.status }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
const dayjs = useDayjs();
defineProps({
  order: Object,
  url: String,
});
</script>
