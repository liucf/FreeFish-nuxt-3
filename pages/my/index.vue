<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar>
      <section aria-labelledby="payment-details-heading">
        <form action="#" @submit.prevent="updateUsername">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="bg-white px-4 py-6 sm:p-6">
              <div>
                <h2
                  id="payment-details-heading"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  This is where you can update your profile.
                </p>
              </div>

              <h1>Balance: {{ user?.data.balance }}</h1>
              <h1>Rating: {{ user?.data.rating }}</h1>

              <div class="mt-6">
                <div class="py-4">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <input
                    type="text"
                    name="email"
                    id="email"
                    :value="user?.data?.email"
                    autocomplete="cc-given-name"
                    disabled
                    class="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>
                <div class="">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Username</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="username"
                    autocomplete="cc-given-name"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </MySidebar>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
const { $swal } = useNuxtApp();
useSeoMeta({
  title: "My Account | " + useState("title").value,
});

definePageMeta({
  middleware: "auth",
});

const user = ref(null);
let username = ref("");

onMounted(async () => {
  user.value = await myFetch("/api/user");
  username.value = user.value.data.name;
});

const updateUsername = async () => {
  try {
    await myFetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({
        name: username.value,
      }),
    });
    $swal.fire({
      // position: "bottom-end",
      title: "Updated Successfully",
      icon: "success",
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false,
      // customClass: {
      //   container: "w-10",
      //   icon: "w-1 h-1",
      // },
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
