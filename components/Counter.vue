<template>
    <div>
        <div>
            <h1>Counter: {{ counter }}</h1>
            <button @click="increment">Increment</button>
            <button @click="decrement">Decrement</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    const counter = ref(0)
    const increment = () => counter.value++
    const decrement = () => counter.value--
</script>
