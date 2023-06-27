export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        if (isLoggedIn.value) {
            if (to.path === '/my') return
            return navigateTo('/my')
        }
    }
})