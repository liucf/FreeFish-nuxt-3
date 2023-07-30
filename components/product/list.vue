<template>
    <div v-for="product in products" :key="product.id">
        <ProductItem :product="product" />
    </div>
</template>

<script setup>
defineProps({
    products: Array
})
</script>