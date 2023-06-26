export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('hello', (name: string) => `Hello ${name}!`)
})