<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar>
      <section aria-labelledby="payment-details-heading" v-cloak>
        <form action="#" method="POST">
          <div v-if="orders?.data.data.length == 0">
            <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <ExclamationTriangleIcon
                    class="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    You have no solds yet.
                    {{ " " }}
                    <NuxtLink
                      href="/sell"
                      class="font-medium text-yellow-700 underline hover:text-yellow-600"
                      >Go to post now.</NuxtLink
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="shadow sm:overflow-hidden sm:rounded-md" v-else>
            <div class="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="order in orders?.data.data" :key="order.id">
                  <MyOrder url="sold" :order="order" />
                </li>
              </ul>
            </div>

            <TailwindPagination
              class="float-right mt-12"
              :data="orders?.data"
              :limit="2"
              :keepLength="true"
              @pagination-change-page="getResults"
              :active-classes="[
                'bg-lightning-yellow-500',
                'border-lightning-yellow-600',
                'text-white',
              ]"
            />
          </div>
        </form>
      </section>
    </MySidebar>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import { TailwindPagination } from "laravel-vue-pagination";
useSeoMeta({
  title: "Order | " + useState("title").value,
});

definePageMeta({
  middleware: "auth",
});

const orders = ref(null);

const getResults = async (page = 1) => {
  orders.value = await useMyFetch("/api/my-sold/?page=" + page);
  // console.log(products.value);
};

getResults();
</script>
