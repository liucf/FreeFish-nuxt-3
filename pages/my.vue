<template>
    <div class="container mx-auto w-1/2 py-8">
        <div>
            <div>Name: {{ user?.name }}</div>
            <div>Email: {{ user?.email }}</div>
        </div>
    </div>
</template>
  
<script setup>
const { data: user } = await useApiFetch('/api/user')
</script>