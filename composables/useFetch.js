export function useApiFetchOptions(opts) {
    const config = useRuntimeConfig();
    const token = useCookie('XSRF-TOKEN')
    // const { $i18n } = useNuxtApp();
    return {
        baseURL: config.public.BASE_URL_SERVER,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': token.value,
        },
        ...opts,
    };
}

export function useMyFetch(url, opts) {
    try {
        return useFetch(url, useApiFetchOptions(opts));
    } catch (e) {
        console.log(e)
    }
}

export function myFetch(url, opts) {
    return $fetch(url, useApiFetchOptions(opts));
}