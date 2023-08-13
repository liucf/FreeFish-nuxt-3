<template>
  <div
    class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8"
  >
    <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
      <div class="lg:col-span-5 lg:col-start-8">
        <div class="flex justify-between">
          <h1 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            {{ product.name }}
          </h1>
          <p
            class="ml-4 whitespace-nowrap text-xl font-bold text-gray-900 dark:text-gray-200"
          >
            $ {{ product.price }}
          </p>
        </div>
        <div class="text-sm text-gray-400">
          <!-- {{ product.updated_at ? $format(product.updated_at) : '' }} -->
          {{ product.updated_at ? dayjs(product.updated_at).fromNow() : "" }}
        </div>

        <!-- Reviews -->
        <div class="mt-4">
          <h2 class="sr-only">Reviews</h2>
          <div class="flex items-center justify-between">
            <p class=" ">
              {{ product.user?.name }}
            </p>

            <div class="ml-1 flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  product.user?.rating > rating
                    ? 'text-yellow-400'
                    : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              <p class="sr-only ml-4 text-sm text-gray-700">
                {{ product.user?.rating }}
                <span class="sr-only"> out of 5 stars</span>
              </p>
            </div>

            <div class="ml-4 flex">
              <NuxtLink
                v-if="reviews.data?.length"
                href="#"
                @click="scrollToReviews"
                class="border-none text-sm font-medium text-lightning-yellow-600 hover:text-lightning-yellow-500"
                >See reviews</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Image gallery -->
      <div
        class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
      >
        <h2 class="sr-only">Images</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          <img
            v-for="(image, index) in product.thumbs"
            :key="image.id"
            :src="getImgPath(image?.name)"
            alt=""
            :class="[
              index == 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
              'rounded-lg',
            ]"
          />
        </div>
      </div>

      <div class="mt-8 lg:col-span-5">
        <div class="mt-10">
          <h2 class="text-sm font-medium text-gray-900">Description</h2>
          <div
            class="prose prose-sm mt-4 text-gray-500 dark:text-gray-400"
            v-html="product.description ? product.description : ''"
          />
        </div>

        <div v-if="product.user_id != user?.data.id">
          <NuxtLink
            :href="`/checkout/${product?.name}`"
            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-lightning-yellow-400 px-8 py-3 text-base font-medium text-white hover:bg-lightning-yellow-500 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 focus:ring-offset-2"
          >
            Buy now
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink
            :href="`/my/product/${product?.name}`"
            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-lightning-yellow-400 px-8 py-3 text-base font-medium text-white hover:bg-lightning-yellow-500 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 focus:ring-offset-2"
          >
            Go to Edit
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      class="mt-16 sm:mt-24"
      v-if="reviews.data?.length"
    >
      <div class="flex items-center justify-between">
        <h2 id="reviews-heading" class="text-lg font-medium text-gray-900">
          Recent reviews
        </h2>
        <div class="ml-4 flex">
          <a
            v-if="reviews.data.length > reviewsCount"
            href="#"
            class="text-sm font-medium text-lightning-yellow-600 hover:text-lightning-yellow-500"
            @click.prevent="reviewsCount = reviews.length"
          >
            Show all {{ reviews.data.length }} reviews
          </a>
        </div>
      </div>

      <div
        class="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10"
      >
        <div
          v-for="review in reviews.data.slice(0, reviewsCount)"
          :key="review.id"
          class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
        >
          <div
            class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8"
          >
            <div class="flex items-center xl:col-span-1">
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    review.rating > rating
                      ? 'text-yellow-400'
                      : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="ml-3 text-sm text-gray-700">
                {{ review.rating }}<span class="sr-only"> out of 5 stars</span>
              </p>
            </div>

            <div class="lg:mt-6 xl:col-span-2 xl:mt-0">
              <!-- <h3 class="text-sm font-medium text-gray-900">{{ review.title }}</h3> -->
              <div
                class="space-y-6 text-sm text-gray-500 dark:text-gray-200"
                v-html="review.content"
              />
            </div>
          </div>

          <div
            class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3"
          >
            <p class="font-medium text-gray-900 dark:text-gray-200">
              {{ review.author.name }}
            </p>
            <time
              class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
            >
              {{ dayjs(review.created_at).fromNow() }}
            </time>
          </div>
        </div>
      </div>
    </section>

    <!-- Related products -->
    <section aria-labelledby="related-heading" class="mt-16 sm:mt-24">
      <h2 id="related-heading" class="text-lg font-medium text-gray-900">
        Recommend products
      </h2>
      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="relatedProduct in relatedProducts.data"
          :key="relatedProduct.id"
          class="group relative"
        >
          <NuxtLink :href="`/product/${relatedProduct?.name}`">
            <div
              class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
            >
              <img
                :src="getImgPath(relatedProduct.thumbs[0]?.name)"
                :alt="relatedProduct.name"
                class="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700 dark:text-gray-400">
                  <a :href="relatedProduct.href">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ relatedProduct.name }}
                  </a>
                </h3>
              </div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
                ${{ relatedProduct.price }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { StarIcon } from "@heroicons/vue/20/solid";
const dayjs = useDayjs();

const route = useRoute();
let product = ref({});
let relatedProducts = ref([]);
let reviews = ref([]);
let reviewsCount = ref(5);

useSeoMeta({
  title: route.params.name + " | " + useState("title").value,
});

const user = await myFetch("/api/user");

// const getResults = async () => {
let productReturn = await useMyFetch("/api/product/show/" + route.params.name);
product = productReturn.data;
relatedProducts.value = await useMyFetch(
  "/api/product/related/" + route.params.name,
);
reviews.value = await useMyFetch("/api/review/byuser/" + product.value.user_id);
console.log(product);
// };

// getResults();

function getImgPath(imgName) {
  const config = useRuntimeConfig();
  if (!imgName)
    return config.public.BASE_URL_SERVER + "/storage/default/computer.jpeg";
  return config.public.BASE_URL_SERVER + "/storage/product/" + imgName;
}

function scrollToReviews() {
  const el = document.getElementById("reviews");
  el.scrollIntoView({ behavior: "smooth" });
}
</script>
