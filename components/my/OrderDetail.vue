<template>
  <section aria-labelledby="payment-details-heading">
    <form action="#" method="POST">
      <div>
        <h2 class="font-bold">Product Information</h2>
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
      </div>

      <div v-if="product.order.delivered_by">
        <hr class="my-12" />
        <h2 class="font-bold">Ship Information</h2>
        <div class="mt-6" v-if="product.order.delivered_by">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Delivery By</label
          >
          <div>
            <p class="text-gray-500">{{ product.order.delivered_by }}</p>
          </div>

          <div class="mt-6" v-if="product.order.tracking_number">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Tracking Number</label
            >
            <div>
              <p class="text-gray-500">{{ product.order.tracking_number }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-12">
        <div class="rounded-md bg-yellow-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <InformationCircleIcon
                class="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-yellow-700">Waiting for seller to ship</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="float-right mt-12 flex"
        v-if="product.order.status == 'shipped'"
      >
        <button
          type="button"
          @click.prevent="confirmReceived"
          class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
        >
          Confirm Received
        </button>
      </div>

      <div v-if="product.order.status == 'delivered'">
        <hr class="my-12" />
        <h2 class="font-bold">Review</h2>
        <div class="mt-6">
          <label for="rating" class="block text-sm font-medium text-gray-700"
            >Rating</label
          >
          <div>
            <select v-model="review.rating" name="rating" id="rating">
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
            </select>
          </div>
        </div>

        <div class="mt-6">
          <label for="content" class="block text-sm font-medium text-gray-700"
            >Content</label
          >
          <div>
            <textarea
              id="content"
              name="content"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Wirte your review here"
              v-model="review.content"
            ></textarea>
          </div>
        </div>
      </div>

      <div
        class="float-right mt-12 flex"
        v-if="product.order.status == 'delivered'"
      >
        <button
          type="button"
          @click.prevent="giveReview"
          class="flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:ring-offset-2"
        >
          Give a Review
        </button>
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
const { $swal } = useNuxtApp();
import {
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/20/solid";
const props = defineProps({
  product: Object,
});
const { product } = props;

let review = ref({
  rating: 1,
  content: "",
});

async function confirmReceived() {
  let response = await myFetch("/api/confirm", {
    method: "POST",
    body: {
      orderId: product.order.id,
    },
  });

  if (response.success) {
    product.order.status = "delivered";
    $swal.fire({
      title: "You have confirmed the order received.!",
      text: "Please give a review for this product.",
      icon: "success",
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false,
    });
    // window.location.href = "/my/products";
  } else {
    alert(response);
  }
}

async function giveReview() {
  let response = await myFetch("/api/review", {
    method: "POST",
    body: {
      orderId: product.order.id,
      review: review.value,
    },
  });

  if (response.success) {
    $swal.fire({
      title: "Thank you for your review!",
      icon: "success",
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false,
    });
    product.order.status = "reviewed";
    // window.location.href = "/my/products";
  } else {
    alert(response);
  }
}
</script>
