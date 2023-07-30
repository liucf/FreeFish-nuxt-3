<template>
    <div class="container mx-auto w-1/2 py-8">
        <div v-if="user">
            <div>Name: {{ user?.data.name }}</div>
        </div>
    </div>
</template>
  
<script setup>

definePageMeta({
    middleware: 'auth'
})

const user = ref(null)

onMounted(async () => {
    user.value = await myFetch('/api/user')
})
</script>