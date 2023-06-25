<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <Counter />
        <p>
            Mouse position is at: {{ x }}, {{ y }}
        </p>
        <div>
            <h2>Users</h2>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }}
                </li>
            </ul>
        </div>

        <h2>
            <pre>{{ data }}</pre>
        </h2>
    </div>
</template>

<script setup>
const { x, y } = useMouse()

const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
    transform: (users) => {
        return users.map(user => ({ name: user.name }))
    }
})

const { data } = await useFetch('/api/hello')

</script>