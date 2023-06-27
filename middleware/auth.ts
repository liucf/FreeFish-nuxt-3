export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        if (!isLoggedIn.value) {
            if (to.path === '/login') return
            return navigateTo('/login')
        }
    }
})