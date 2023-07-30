<template>
    <!-- Collections -->
    <section aria-labelledby="collections-heading" class="bg-gray-100 dark:bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <h2 id="collections-heading" class="text-2xl font-bold text-gray-900">Collections</h2>

                <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 lg:gap-y-6">
                    <div v-for="collection in collections.data" :key="collection.name" class="group relative">
                        <div
                            class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                            <img :src="getImgPath(collection?.thumb)" :alt="collection.name"
                                class="h-full w-full object-cover object-center" />
                        </div>
                        <h3 class="mt-6 text-sm text-gray-500 dark:text-gray-100">
                            <span class="absolute inset-0" />
                            {{ collection.rootcategory.name }}
                        </h3>
                        <p class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ collection.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

type SubCategory = {
    id: number,
    name: string,
    thumb: string,
    rootcategory: {
        name: string
    }
}

let collections = ref<SubCategory[]>([])

const getCollections = async () => {
    collections.value = await useMyFetch('/api/subcategory/featured')
}

getCollections();

function getImgPath(imgName: string): string {
    const config = useRuntimeConfig();
    return imgName ? config.public.BASE_URL_SERVER + '/storage/subcategory/' + imgName : 'logo.png';
}
</script>