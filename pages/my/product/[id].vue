<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar currentSlug="my-products">
      <Progress v-if="product.status == 'sold'" :stepStatus="getStepStatus()" />

      <section aria-labelledby="payment-details-heading">
        <form action="#" method="POST">
          <h3>Product Information</h3>

          <div class="mt-6">
            <img
              :src="$getimgpath(form.thumbs[0]?.name)"
              :alt="form.thumbs[0]?.name"
              class="h-[128px] w-[128px] object-cover object-center"
            />
          </div>

          <div class="mt-6">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <div class="mt-1">
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
          </div>

          <div class="mt-6">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Price</label
            >
            <div class="mt-1 flex rounded-md shadow-sm">
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
          </div>

          <div class="mt-6">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <div class="mt-1">
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
          </div>

          <div v-if="form.order">
            <hr class="my-12" />
            <h3>Order Information</h3>
            <div class="mt-6">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Address</label
              >
              <p
                v-html="
                  ` ${form.order?.address.name}
                    <br/>
                ${form.order?.address.email}
                <br/>
                ${form.order?.address.address}
                <br/>
                ${form.order?.address.city}
                <br/>
                ${form.order?.address.country}
                `
                "
              ></p>
            </div>

            <div class="mt-6">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Delivery By</label
              >
              <div class="mt-1">
                <input
                  id="name"
                  v-model="delivery.delivered_by"
                  name="name"
                  type="text"
                  class="block w-1/2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Courier"
                  :disabled="form.order.status != 'paid'"
                  :class="{
                    'cursor-not-allowed bg-gray-100':
                      form.order.status != 'paid',
                  }"
                />
              </div>
            </div>

            <div class="mt-6">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Tracking Number</label
              >
              <div class="mt-1">
                <input
                  id="name"
                  v-model="delivery.tracking_number"
                  name="name"
                  type="text"
                  class="block w-1/2 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tracking Number"
                  :disabled="form.order.status != 'paid'"
                  :class="{
                    'cursor-not-allowed bg-gray-100':
                      form.order.status != 'paid',
                  }"
                />
              </div>
            </div>
          </div>

          <div
            class="float-right mt-12 flex"
            v-if="product?.status == 'active'"
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
            v-if="form.order?.status == 'paid'"
          >
            <button
              type="button"
              @click.prevent="deliveryOrder"
              class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
            >
              Delivery
            </button>
          </div>
        </form>
      </section>
    </MySidebar>
  </div>
</template>

<script setup>
const { $getimgpath } = useNuxtApp();

const route = useRoute();
let product = ref({});
let order = ref({});
let form = ref({
  name: "",
  price: "",
  rootcategory: "",
  subcategory: "",
  category: "",
  description: "",
  order: null,
  thumbs: [],
});
let delivery = ref({
  delivered_by: "",
  tracking_number: "",
});

definePageMeta({
  middleware: ["auth"],
});
useSeoMeta({
  title: "Product Detail | " + useState("title").value,
});

const getResults = async () => {
  let res = await useMyFetch("/api/product/byid/" + route.params.id);

  product = res.data;
  form.value.name = product.value.name;
  form.value.price = product.value.price;
  form.value.description = product.value.description;
  form.value.order = product.value.order;
  form.value.thumbs = product.value.thumbs;
  delivery.value.delivered_by = product.value.order?.delivered_by;
  delivery.value.tracking_number = product.value.order?.tracking_number;
};

getResults();

async function deliveryOrder() {
  let response = await myFetch("/api/delivery", {
    method: "POST",
    body: {
      productId: product.value.id,
      orderId: product.value.order.id,
      delivery: delivery.value,
    },
  });

  if (response.success) {
    window.location.href = "/my/products";
  } else {
    alert(response);
  }
}

const getStepStatus = () => {
  if (product.value.order.status == "paid") {
    return ["current", "upcoming", "upcoming"];
  } else if (product.value.order.status == "shipped") {
    return ["complete", "current", "upcoming"];
  } else if (product.value.order.status == "deliveried") {
    return ["complete", "complete", "current"];
  } else {
    return ["complete", "complete", "complete"];
  }
};
</script>
