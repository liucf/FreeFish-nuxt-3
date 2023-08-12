import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
    const { removeUser } = useAuth()

    globalThis.$fetch = ofetch.create({
        onResponseError({ request, response, options }) {
            // console.log('[fetch response error]', request, response.status, response.body)
            switch (response.status) {
                case 401:
                    console.log('401')
                    console.log(response._data.message)
                // removeUser()
                // alert('Please login again')
                // window.location.href = '/login'
                case 422:
                    const { $swal } = useNuxtApp();
                    console.log(response._data.message)
                    $swal.fire({
                        title: response._data.message,
                        icon: "error",
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
            }
        }
    });
});
