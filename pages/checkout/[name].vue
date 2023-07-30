<template>
    <div class="bg-white dark:bg-gray-800">
        <!-- Background color split screen for large screens -->
        <div class="fixed top-0 left-0 hidden h-full w-1/2 bg-white dark:bg-gray-800 lg:block" aria-hidden="true" />
        <div class="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 dark:bg-gray-700 lg:block" aria-hidden="true" />

        <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
            <h1 class="sr-only">Order information</h1>

            <section aria-labelledby="summary-heading"
                class="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
                <div class="mx-auto max-w-lg lg:max-w-none">
                    <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                    <h3 class="py-4">{{ product.name }}</h3>
                    <ul role="list" class="divide-y divide-gray-200 text-sm font-medium text-gray-900 dark:text-gray-200">
                        <li class="flex items-start space-x-4 py-6 justify-between">
                            <!-- {{ product.thumbs ? $getimgpath(product.thumbs[0]?.name) : '' }} -->
                            <img v-if="product.thumbs" :src="$getimgpath(product.thumbs[0]?.name)" :alt="product.name"
                                class="h-20 w-20 flex-none rounded-md object-cover object-center" />
                            <p class="flex-none text-base font-medium">${{ product.price }}</p>
                        </li>
                    </ul>

                    <dl
                        class="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 dark:text-gray-200 lg:block">
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

                        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                            <dt class="text-base">Total</dt>
                            <dd class="text-base">${{ totalPrice }}</dd>
                        </div>
                    </dl>


                </div>
            </section>

            <form class="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                <div class="mx-auto max-w-lg lg:max-w-none">
                    <section aria-labelledby="contact-info-heading">
                        <h2 id="contact-info-heading" class="text-lg font-medium text-gray-900 dark:text-gray-200">Contact
                            information</h2>

                        <div class="mt-6">
                            <label for="email-address"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email address</label>
                            <div class="mt-1">
                                <input type="email" id="email-address" name="email-address" autocomplete="email"
                                    class="checkout-input" />
                            </div>
                        </div>
                    </section>


                    <section aria-labelledby="shipping-heading" class="mt-10">
                        <h2 id="shipping-heading" class="text-lg font-medium text-gray-900">Shipping address</h2>

                        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div class="sm:col-span-3">
                                <label for="company"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Company</label>
                                <div class="mt-1">
                                    <input type="text" id="company" name="company" class="checkout-input" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="address"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Address</label>
                                <div class="mt-1">
                                    <input type="text" id="address" name="address" autocomplete="street-address"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="apartment"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Apartment, suite,
                                    etc.</label>
                                <div class="mt-1">
                                    <input type="text" id="apartment" name="apartment" class="checkout-input" />
                                </div>
                            </div>

                            <div>
                                <label for="city"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
                                <div class="mt-1">
                                    <input type="text" id="city" name="city" autocomplete="address-level2"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div>
                                <label for="region" class="block text-sm font-medium text-gray-700 dark:text-gray-200">State
                                    / Province</label>
                                <div class="mt-1">
                                    <input type="text" id="region" name="region" autocomplete="address-level1"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div>
                                <label for="postal-code"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Postal code</label>
                                <div class="mt-1">
                                    <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code"
                                        class="checkout-input" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="billing-heading" class="mt-10">
                        <h2 id="billing-heading" class="text-lg font-medium text-gray-900">Billing information</h2>

                        <div class="mt-6 flex items-center">
                            <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked=""
                                class="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                            <div class="ml-2">
                                <label for="same-as-shipping"
                                    class="text-sm font-medium text-gray-900 dark:text-gray-200">Same as shipping
                                    information</label>
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="payment-heading" class="mt-10">
                        <h2 id="payment-heading" class="text-lg font-medium text-gray-900">Payment details</h2>

                        <div class="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                            <div class="col-span-3 sm:col-span-4">
                                <label for="name-on-card"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Name on
                                    card</label>
                                <div class="mt-1">
                                    <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div class="col-span-3 sm:col-span-4">
                                <label for="card-number"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Card number</label>
                                <div class="mt-1">
                                    <input type="text" id="card-number" name="card-number" autocomplete="cc-number"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div class="col-span-2 sm:col-span-3">
                                <label for="expiration-date"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">Expiration date
                                    (MM/YY)</label>
                                <div class="mt-1">
                                    <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp"
                                        class="checkout-input" />
                                </div>
                            </div>

                            <div>
                                <label for="cvc"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-200">CVC</label>
                                <div class="mt-1">
                                    <input type="text" name="cvc" id="cvc" autocomplete="csc" class="checkout-input" />
                                </div>
                            </div>
                        </div>
                    </section>


                    <div class="mt-10 dpt-6 sm:flex sm:items-center sm:justify-between">
                        <button @click.prevent="gotopay"
                            class="w-full rounded-md border border-transparent bg-yellow-600 py-2 px-8 text-xl font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last  text-right ml-auto sm:w-auto">Pay
                            now</button>
                        <!-- <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">You won't be charged until
                            the next step.</p> -->
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>



<script setup>
definePageMeta({
    middleware: ['auth']
})

const route = useRoute()
let product = ref({})
let shippingPrice = ref(0)
let totalPrice = ref(0)

useSeoMeta({
    title: route.params.name + ' - TradeMy',
})

const getResults = async () => {
    product.value = await apiFetch('/api/product/show/' + route.params.name)
    totalPrice.value = product.value.price + shippingPrice.value
}

getResults();

async function gotopay() {
    errors.value = []
    try {
        await apiFetch('/pay', {
            method: 'POST',
            body: {
                product: product.id,
                amount: totalPrice.value
            },
        })
        // window.location.href = '/my'
    }
    catch (error) {
        console.log(error)
        errors.value = Object.values(error.data.errors).flat()
    }
}

</script>