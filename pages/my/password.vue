<template>
  <div class="container mx-auto py-8">
    <MyVerified :verify="user ? user.data.hasVerifiedEmail : true" />

    <MySidebar>
      <section aria-labelledby="payment-details-heading">
        <form action="#" @submit.prevent="resetPassword">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="bg-white px-4 py-6 sm:p-6">
              <div>
                <h2
                  id="payment-details-heading"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Password
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  This is where you can update your password.
                </p>
              </div>

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
                    disabled
                    v-model="form.email"
                    class="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>

                <div class="mt-6">
                  <label
                    for="current_password"
                    class="block text-sm font-medium text-gray-700"
                    >Current Password</label
                  >
                  <input
                    type="password"
                    name="current_password"
                    id="current_password"
                    v-model="form.current_password"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>

                <div class="mt-6">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >New Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="form.password"
                    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  />
                </div>
                <div class="mt-6">
                  <label
                    for="password_confirmation"
                    class="block text-sm font-medium text-gray-700"
                    >Confirm New Password</label
                  >
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="form.password_confirmation"
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
  title: "Password | " + useState("title").value,
});

definePageMeta({
  middleware: "auth",
});

const user = ref(null);
let form = ref({
  email: "",
  current_password: "",
  password: "",
  password_confirmation: "",
});

onMounted(async () => {
  user.value = await myFetch("/api/user");
  form.value = {
    email: user.value.data.email,
    password: "",
    password_confirmation: "",
  };
});

const resetPassword = async () => {
  let response = "";
  try {
    response = await myFetch("/api/update-password", {
      method: "POST",
      body: form.value,
    });
    $swal.fire({
      title: "Password reset successfully",
      icon: "success",
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  } catch (error) {
    console.log(error);
    console.log(response);
    // $swal.fire({
    //   title: "Password reset failed",
    //   icon: "error",
    //   timer: 1000,
    //   showCancelButton: false,
    //   showConfirmButton: false,
    // });
  }
};
</script>
