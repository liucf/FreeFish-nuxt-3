<template>
  <div class="bg-white dark:bg-gray-800">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed left-0 top-0 hidden h-full w-1/2 bg-white dark:bg-gray-800 lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 dark:bg-gray-700 lg:block"
      aria-hidden="true"
    />

    <div
      class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48"
    >
      <h1 class="sr-only">Order information</h1>

      <section
        aria-labelledby="summary-heading"
        class="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
      >
        <div class="mx-auto max-w-lg lg:max-w-none">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <h3 class="py-4">{{ product?.name }}</h3>
          <ul
            role="list"
            class="divide-y divide-gray-200 text-sm font-medium text-gray-900 dark:text-gray-200"
          >
            <li class="flex items-start justify-between space-x-4 py-6">
              <!-- {{ product.thumbs ? $getimgpath(product.thumbs[0]?.name) : '' }} -->
              <img
                v-if="product.thumbs"
                :src="$getimgpath(product.thumbs[0]?.name)"
                :alt="product.name"
                class="h-20 w-20 flex-none rounded-md object-cover object-center"
              />
              <p class="flex-none text-base font-medium">
                ${{ product.price }}
              </p>
            </li>
          </ul>

          <dl
            class="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 dark:text-gray-200 lg:block"
          >
            <!-- <div class="flex items-center justify-between">
                            <dt class="text-gray-600">Subtotal</dt>
                            <dd>$320.00</dd>
                        </div> -->

            <div class="flex items-center justify-between">
              <dt class="text-gray-600 dark:text-gray-200">Shipping</dt>
              <dd>${{ shippingPrice }}</dd>
            </div>

            <!-- <div class="flex items-center justify-between">
                            <dt class="text-gray-600">Taxes</dt>
                            <dd>$26.80</dd>
                        </div> -->

            <div
              class="flex items-center justify-between border-t border-gray-200 pt-6"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">${{ totalPrice }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Form
        class="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
        @submit="onSubmit"
      >
        <div class="mx-auto max-w-lg lg:max-w-none">
          <section aria-labelledby="contact-info-heading">
            <h2
              id="contact-info-heading"
              class="text-lg font-medium text-gray-900 dark:text-gray-200"
            >
              Contact information
            </h2>

            <div class="mt-6">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Email address</label
              >
              <div class="mt-1">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  v-model="fillInfo.email"
                  :rules="validateEmail"
                  autocomplete="email"
                  class="checkout-input"
                />

                <ErrorMessage
                  class="text-sm italic text-red-600"
                  name="email"
                />
              </div>
            </div>
          </section>

          <section aria-labelledby="shipping-heading" class="mt-10">
            <h2 id="shipping-heading" class="text-lg font-medium text-gray-900">
              Shipping address
            </h2>

            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div class="sm:col-span-3">
                <label
                  for="company"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Name</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    v-model="fillInfo.address.name"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="name"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Address</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    v-model="fillInfo.address.address"
                    autocomplete="street-address"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="address"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="apartment"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Apartment, suite, etc.</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="apartment"
                    name="apartment"
                    v-model="fillInfo.address.apartment"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="apartment"
                  />
                </div>
              </div>

              <div>
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >City</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    v-model="fillInfo.address.city"
                    autocomplete="address-level2"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="city"
                  />
                </div>
              </div>

              <div>
                <label
                  for="state"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >State / Province</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    v-model="fillInfo.address.state"
                    autocomplete="address-level1"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="state"
                  />
                </div>
              </div>

              <div>
                <label
                  for="postal-code"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Postal code</label
                >
                <div class="mt-1">
                  <Field
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    v-model="fillInfo.address.postal_code"
                    autocomplete="postal-code"
                    class="checkout-input"
                    :rules="validateRequired"
                  />
                  <ErrorMessage
                    class="text-sm italic text-red-600"
                    name="postal-code"
                  />
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="billing-heading" class="mt-10">
            <h2 id="billing-heading" class="text-lg font-medium text-gray-900">
              Billing information
            </h2>

            <div class="mt-6 flex items-center">
              <input
                id="same-as-shipping"
                name="same-as-shipping"
                type="checkbox"
                checked=""
                class="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <div class="ml-2">
                <label
                  for="same-as-shipping"
                  class="text-sm font-medium text-gray-900 dark:text-gray-200"
                  >Same as shipping information</label
                >
              </div>
            </div>
          </section>

          <section v-if="false" aria-labelledby="payment-heading" class="mt-10">
            <h2 id="payment-heading" class="text-lg font-medium text-gray-900">
              Payment details
            </h2>

            <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
              <div class="col-span-3 sm:col-span-4">
                <label
                  for="name-on-card"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Name on card</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="name-on-card"
                    name="name-on-card"
                    autocomplete="cc-name"
                    class="checkout-input"
                  />
                </div>
              </div>

              <div class="col-span-3 sm:col-span-4">
                <label
                  for="card-number"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Card number</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    autocomplete="cc-number"
                    class="checkout-input"
                  />
                </div>
              </div>

              <div class="col-span-2 sm:col-span-3">
                <label
                  for="expiration-date"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >Expiration date (MM/YY)</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="expiration-date"
                    id="expiration-date"
                    autocomplete="cc-exp"
                    class="checkout-input"
                  />
                </div>
              </div>

              <div>
                <label
                  for="cvc"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >CVC</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    autocomplete="csc"
                    class="checkout-input"
                  />
                </div>
              </div>
            </div>
          </section>

          <div class="dpt-6 mt-10 sm:flex sm:items-center sm:justify-between">
            <button
              class="ml-auto w-full rounded-md border border-transparent bg-yellow-600 px-8 py-2 text-right text-xl font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:w-auto"
            >
              Pay now
            </button>
            <!-- <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">You won't be charged until
                            the next step.</p> -->
          </div>
        </div>
      </Form>
    </div>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div class="col-span-3 sm:col-span-4">
                  <label
                    for="name-on-card"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >Name on card</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      id="card-holder-name"
                      name="name-on-card"
                      autocomplete="cc-name"
                      class="checkout-input"
                    />
                  </div>
                </div>

                <div class="col-span-3 sm:col-span-4">
                  <label
                    for="card-number"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >Card Information</label
                  >
                  <div class="mt-1">
                    <div id="card-element" class="checkout-input" />
                  </div>
                </div>
              </div>

              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  id="card-button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  :disabled="isLoading"
                  :class="
                    !isLoading ? 'hover:bg-indigo-700 ' : ' cursor-not-allowed'
                  "
                >
                  <svg
                    v-if="isLoading"
                    class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span v-if="!isLoading">Process Payment</span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
#card-element {
  border: 1px solid currentColor;
  border-radius: 4px;
  height: 48px;
  /* margin-bottom: 20px; */
  padding: 10px;
}
</style>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { Form, Field, ErrorMessage } from "vee-validate";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
let product = ref({});
let shippingPrice = ref(0);
let totalPrice = ref(0);
let errors = ref([]);
const open = ref(false);
const config = useRuntimeConfig();
const { $swal } = useNuxtApp();
const isLoading = ref(false);

let fillInfo = ref({
  email: "",
  address: {
    name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postal_code: "",
  },
});

useSeoMeta({
  title: route.params.name + " | " + useState("title").value,
});

const getResults = async () => {
  useMyFetch("/api/product/show/" + route.params.name).then((res) => {
    product = res.data;
    totalPrice.value = product.value.price + shippingPrice.value;
  });
};

let stripe = null;

onMounted(async () => {
  getResults();
});

function onSubmit(values) {
  //   console.log(JSON.stringify(values, null, 2));
  open.value = true;
  initPay();
}

function validateEmail(value) {
  if (!value) {
    return "This field is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  return true;
}

function validateRequired(value) {
  if (!value) {
    return "This field is required";
  }
  return true;
}

async function initPay() {
  //   if (stripe != null) {
  //     return;
  //   }
  const appearance = {
    theme: "flat",
  };
  //   let clientSecret = "123";
  stripe = await loadStripe(config.public.STRIPE_KEY);
  const elements = stripe.elements({ appearance });
  const cardElement = elements.create("card", {
    hidePostalCode: true,
    // layout: {
    //   type: "accordion",
    //   defaultCollapsed: false,
    //   radios: true,
    //   spacedAccordionItems: false,
    // },
    style: {
      base: {
        iconColor: "#666ee8",
        color: "#31325f",
        fontWeight: 500,
        fontFamily: "Ideal Sans, system-ui, sans-serif",
        fontSize: "20px",
        fontSmoothing: "antialiased",
        padding: "10px 12px",

        "::placeholder": {
          color: "#aab7c4",
        },

        ":-webkit-autofill": {
          color: "#666ee8",
        },
      },
      invalid: {
        iconColor: "#ef3b2d",
        color: "#ef3b2d",
      },
    },
  });

  cardElement.mount("#card-element");

  const cardHolderName = document.getElementById("card-holder-name");
  const cardButton = document.getElementById("card-button");

  cardButton.addEventListener("click", async (e) => {
    isLoading.value = true;
    const { paymentMethod, error } = await stripe.createPaymentMethod(
      "card",
      cardElement,
      {
        billing_details: {
          name: cardHolderName.value,
          email: fillInfo.value.email,
          address: {
            city: fillInfo.value.address.city,
            line1: fillInfo.value.address.address,
            line2: fillInfo.value.address.apartment,
            postal_code: fillInfo.value.address.postal_code,
            state: fillInfo.value.address.state,
          },
        },
      },
    );

    if (error) {
      // Display "error.message" to the user...
      console.log("error", error);
    } else {
      // The card has been verified successfully...
      //   console.log("paymentMethod", paymentMethod);
      await gotopay(paymentMethod);
    }
    isLoading.value = false;
  });
}

async function gotopay(paymentMethod) {
  errors.value = [];
  try {
    let response = await myFetch("/api/pay", {
      method: "POST",
      body: {
        product: product.value.id,
        amount: totalPrice.value,
        paymentMethodID: paymentMethod.id,
        fillInfo: fillInfo.value,
      },
    });
    // console.log(response);
    if (response.success) {
      open.value = false;
      $swal
        .fire({
          title: "Payment Successfully!",
          icon: "success",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
        })
        .then(() => {
          window.location.href = "/my/orders";
        });
    } else {
      console.log(response);
      $swal.fire({
        title: "Payment Failed!",
        text: response.message,
        icon: "error",
        timer: 2000,
        //   showCancelButton: false,
        //   showConfirmButton: false,
      });
    }
  } catch (error) {
    console.log(error);
    // errors.value = Object.values(error.data.errors).flat();
    alert(error);
  }
}
</script>
