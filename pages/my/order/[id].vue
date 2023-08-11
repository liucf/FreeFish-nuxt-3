<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar currentSlug="my-orders">
      <Progress :order="order" />
      <MyOrderDetail  :product="product" />
    </MySidebar>
  </div>
</template>

<script setup>
const route = useRoute();
let product = ref({});

definePageMeta({
  middleware: ["auth"],
});
useSeoMeta({
  title: " Order Detail | " + useState("title").value,
});

let res = await useMyFetch("/api/product/byid/" + route.params.id);
product = res.data;
const order = product.value.order;
</script>
