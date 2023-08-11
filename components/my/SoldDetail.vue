<template>
  <section aria-labelledby="payment-details-heading">
    <form action="#" method="POST">
      <h3>Product Information</h3>
      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <div>
          <p class="text-gray-500">{{ product.name }}</p>
        </div>
      </div>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Price</label
        >
        <div>
          <p class="text-gray-500">NZ${{ product.price }}</p>
        </div>
      </div>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <div>
          <p class="text-gray-500">{{ product.description }}</p>
        </div>
      </div>

      <div>
        <hr class="my-12" />
        <h2 class="font-bold">Order Information</h2>
        <div class="mt-6">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Address</label
          >
          <p
            class="text-gray-700"
            v-html="
              ` ${product.order?.address.name}
                      <br/>
                  ${product.order?.address.email}
                  <br/>
                  ${product.order?.address.address}
                  <br/>
                  ${product.order?.address.city}
                  <br/>
                  ${product.order?.address.country}
                  `
            "
          ></p>
        </div>
      </div>

      <div v-if="!product.order.delivered_by">
        <hr class="my-12" />
        <h2 class="font-bold">Ship Information</h2>
        <div class="mt-6">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Delivery By</label
          >
          <div
            class="mt-1"
            v-if="
              product.order.status == 'paid' && product.order.delivered_by != ''
            "
          >
            <input
              id="name"
              v-model="delivery.delivered_by"
              name="name"
              type="text"
              class="block w-1/2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Courier"
            />
          </div>
          <div v-else>
            <p class="text-gray-500">{{ product.order.delivered_by }}</p>
          </div>
        </div>

        <div class="mt-6">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Tracking Number</label
          >
          <div class="mt-1" v-if="product.order.status == 'paid'">
            <input
              id="name"
              v-model="delivery.tracking_number"
              name="name"
              type="text"
              class="block w-1/2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Tracking Number"
            />
          </div>
          <div v-else>
            <p class="text-gray-500">{{ product.order.tracking_number }}</p>
          </div>
        </div>

        <div
          class="float-right mt-12 flex"
          v-if="
            product.order?.status == 'paid' && product.user_id == user.data.id
          "
        >
          <button
            type="button"
            @click.prevent="deliveryOrder"
            class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
          >
            Delivery
          </button>
        </div>
      </div>

      <div v-if="product.order.status == 'shipped'" class="mt-12">
        <div class="rounded-md bg-yellow-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <InformationCircleIcon
                class="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-yellow-700">
                Waiting for buyer to confirm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="product.order.status == 'delivered'" class="mt-12">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <InformationCircleIcon
                class="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-green-700">
                Buyer has confirmed the order. You will receive the payment in
                your account. Waiting for review from buyer.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12" v-if="product.order.status == 'reviewed'">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon
                class="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                This order has been reviewed and all done. Thank you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
const props = defineProps({
  product: Object,
});
const { product } = props;
import {
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";

let delivery = ref({
  delivered_by: "",
  tracking_number: "",
});

const user = await myFetch("/api/user");

async function deliveryOrder() {
  let response = await myFetch("/api/delivery", {
    method: "POST",
    body: {
      productId: product.id,
      orderId: product.order.id,
      delivery: delivery.value,
    },
  });

  if (response.success) {
    window.location.href = "/my/solds";
  } else {
    alert(response);
  }
}
</script>
