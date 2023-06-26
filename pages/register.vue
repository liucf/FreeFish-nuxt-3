
<template>
    <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register a Account</h2>
        </div>

        <ul v-if="errors.length > 0"
            class="mt-6 list-disc list-inside text-sm text-red-500 text-center sm:mx-auto sm:w-full sm:max-w-md">
            <li v-for="(error, index) in errors" :key="index" class="text-red-500 text-sm italic list-none">{{ error }}</li>
        </ul>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" action="#" method="POST" @submit.prevent="register">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">User Name</label>
                        <div class="mt-1">
                            <input id="name" v-model="name" name="name" type="text" autocomplete="name"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" v-model="email" name="email" type="email" autocomplete="email"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" v-model="password" name="password" type="password"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password Confirm</label>
                        <div class="mt-1">
                            <input id="passwordConfirm" v-model="passwordConfirm" name="passwordConfirm" type="password"
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between" v-if="false">
                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Register</button>
                    </div>
                </form>


            </div>
        </div>
    </div>
</template>

  
<script setup lang="ts">
useSeoMeta({
    title: 'Login | ' + useState('title').value
})

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errors = ref([])

function csrf() {
    return apiFetch('/sanctum/csrf-cookie')
}

async function register() {
    errors.value = []

    await csrf()

    await apiFetch('/register', {
        method: 'POST',
        body: {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirm.value,
        },
    }).catch((error) => {
        console.log(error.data)
        errors.value = Object.values(error.data.errors).flat()
    }).finally(() => {
        if (errors.value.length === 0) {
            window.location.href = '/my'
        }
    })
}
</script>