<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar>
      <section aria-labelledby="payment-details-heading">
        <form action="#" method="POST">
          <div v-if="orders?.data.length == 0">
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
                    You have no orders yet.
                    {{ " " }}
                    <NuxtLink
                      href="/"
                      class="font-medium text-yellow-700 underline hover:text-yellow-600"
                      >Go to shop now.</NuxtLink
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="shadow sm:overflow-hidden sm:rounded-md" v-else>
            <div class="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="order in orders?.data" :key="order.id">
                  <MyOrder url="order" :order="order" />
                </li>
              </ul>
            </div>
          </div>
        </form>
      </section>
    </MySidebar>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";

useSeoMeta({
  title: "Order | " + useState("title").value,
});

definePageMeta({
  middleware: "auth",
});

const orders = ref(null);

const getResults = async (page = 1) => {
  orders.value = await useMyFetch("/api/orders/?page=" + page);
};

getResults();
</script>
