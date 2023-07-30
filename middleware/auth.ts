export default defineNuxtRouteMiddleware((to, from) => {
    const { isLoggedIn } = useAuth()
    if (process.client) {
        if (!isLoggedIn.value) {
            if (to.path === '/login') return
            return navigateTo('/login')
        }
    }
})