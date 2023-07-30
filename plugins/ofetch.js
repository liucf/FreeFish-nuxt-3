import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
    const { removeUser } = useAuth()

    globalThis.$fetch = ofetch.create({
        onResponseError({ request, response, options }) {
            console.log('[fetch response error]', request, response.status, response.body)
            // switch (response.status) {
            // case 401:
            // console.log('401')
            // removeUser()
            // window.location.href = '/login'
            // }
        }
    });
});
