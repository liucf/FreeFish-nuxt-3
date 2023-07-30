
<template>
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
                            <input id="name" v-model="name" name="name" type="text" autocomplete="name" class="input" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input id="email" v-model="email" name="email" type="email" autocomplete="email"
                                class="input" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input id="password" v-model="password" name="password" type="password" class="input" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password Confirm</label>
                        <div class="mt-1">
                            <input id="passwordConfirm" v-model="passwordConfirm" name="passwordConfirm" type="password"
                                class="input" />
                        </div>
                    </div>


                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-lightning-yellow-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">Register</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

  
<script setup>

definePageMeta({
    middleware: ['guest']
})

useSeoMeta({
    title: 'Register | ' + useState('title').value
})

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errors = ref([])

const { $apiFetch } = useNuxtApp()

function csrf() {
    return $fetch('/sanctum/csrf-cookie')
}

async function register() {
    errors.value = []

    await csrf()

    try {
        await $apiFetch('/register', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: passwordConfirm.value,
            },
        })
        // const { data: user } = await useApiFetch('/api/user')
        // setUser(user.value.name)
    }
    catch (error) {
        console.log(error.data)
        errors.value = Object.values(error.data.errors).flat()
    }
    finally {
        if (errors.value.length === 0) {
            // window.location.href = '/my'
        }
    }
}
</script>