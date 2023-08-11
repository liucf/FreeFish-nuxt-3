<template>
  <section aria-labelledby="payment-details-heading">
    <form action="#" method="POST">
      <h3>Product Information</h3>
      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <div class="mt-1" v-if="!sold">
          <input
            id="name"
            v-model="form.name"
            name="name"
            type="text"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            :disabled="product.status != 'active'"
            :class="{
              'cursor-not-allowed bg-gray-100': product.status != 'active',
            }"
          />
        </div>
        <div v-else>
          <p class="text-gray-500">{{ product.name }}</p>
        </div>
      </div>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Price</label
        >
        <div class="mt-1 flex rounded-md shadow-sm" v-if="!sold">
          <span
            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >NZ$</span
          >
          <input
            id="price"
            v-model="form.price"
            name="price"
            type="text"
            class="block rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :disabled="product.status != 'active'"
            :class="{
              'cursor-not-allowed bg-gray-100': product.status != 'active',
            }"
          />
        </div>
        <div v-else>
          <p class="text-gray-500">NZ${{ product.price }}</p>
        </div>
      </div>

      <div class="mt-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <div class="mt-1" v-if="!sold">
          <textarea
            id="description"
            name="description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            v-model="form.description"
            :disabled="product.status != 'active'"
            :class="{
              'cursor-not-allowed bg-gray-100': product.status != 'active',
            }"
          ></textarea>
        </div>
        <div v-else>
          <p class="text-gray-500">{{ product.description }}</p>
        </div>
      </div>

      <div v-if="sold">
        <hr class="my-12" />
        <h3>Order Information</h3>
        <div class="mt-6">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Address</label
          >
          <p
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
      </div>

      <div
        class="float-right mt-12 flex"
        v-if="product?.status == 'active' && product.user_id == user.data.id"
      >
        <button
          type="button"
          class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
        >
          Update
        </button>

        <button
          type="button"
          class="ml-8 flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
        >
          Delete
        </button>
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

      <div
        class="float-right mt-12 flex"
        v-if="
          product.order?.status == 'shipped' &&
          user.data.id == product.order?.user_id
        "
      >
        <button
          type="button"
          @click.prevent="deliveryOrder"
          class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
        >
          Confirm Received
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
const props = defineProps({
  product: Object,
  sold: {
    type: Boolean,
    default: false,
  },
});
const { product } = props;

let form = ref({
  name: "",
  price: "",
  rootcategory: "",
  subcategory: "",
  category: "",
  description: "",
  order: null,
});
let delivery = ref({
  delivered_by: "",
  tracking_number: "",
});

const user = await myFetch("/api/user");
</script>
