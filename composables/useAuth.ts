// export function useAuth() {
// function setUser(name: string) {
//     localStorage.setItem('user', JSON.stringify({ name }))
// }

// function getUser() {
//     return JSON.parse(localStorage.getItem('user'))
// }

// function removeUser() {
//     localStorage.removeItem('user')
// }

// const isLoggedIn = computed(() => {
//     if (process.client) {
//         return !!localStorage.getItem('user')
//     }
// })

// return { setUser, getUser, removeUser, isLoggedIn }
// }

export function setUser(name: string) {
    localStorage.setItem('user', JSON.stringify({ name }))
}
export function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}
export function removeUser() {
    localStorage.removeItem('user')
}
export const isLoggedIn = computed(() => {
    if (process.client) {
        return !!localStorage.getItem('user')
    }
})
