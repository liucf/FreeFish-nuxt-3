<template>
  <div
    class="container mx-auto flex flex-col border-b border-gray-200 dark:bg-gray-800 lg:border-0"
  >
    <!-- <HomeHero /> -->
    <HomeTrending />
    <!-- <HomeCollections /> -->
    <!-- <HomeSale /> -->
    <HomeTestimonials />
  </div>
</template>

<script setup>
const route = useRoute();
const { $swal } = useNuxtApp();
let verified = route.query.verified;
if (verified == 1) {
  $swal.fire({
    title: "Email Verified successfuly!",
    icon: "success",
    timer: 1000,
    showCancelButton: false,
    showConfirmButton: false,
  });
}
</script>
