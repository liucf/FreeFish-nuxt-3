<template>
  <div v-cloak v-if="!verify" class="rounded-md bg-yellow-50 p-4 mb-6">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon
          class="h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3 w-full">
        <h3 class="text-sm font-medium text-yellow-800">
          You email has not been verified!
        </h3>
        <div
          class="mt-2 flex-1 text-sm text-yellow-700 md:flex md:justify-between"
        >
          <p>
            Please check your email box to verify your email address. If you
            have not received the email, please click this link below to resend
            the verification email.
          </p>
          <p class="mt-3 text-sm md:ml-6 md:mt-0">
            <a
              href="#"
              v-on:click.prevent="resend"
              class="whitespace-nowrap font-medium text-yellow-700"
            >
              Send Active Email Again
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
const { $swal } = useNuxtApp();

defineProps({
  verify: {
    type: Boolean,
    required: true,
  },
});

const resend = () => {
  myFetch("email/verification-notification", {
    method: "POST",
  }).then(() => {
    $swal.fire({
      title: "Verifiy email has resent successfuly!",
      icon: "success",
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  });
};
</script>
