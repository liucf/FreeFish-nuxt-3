export function useApiFetchOptions(opts, withFile) {
    const config = useRuntimeConfig();
    const token = useCookie('XSRF-TOKEN')
    // const { $i18n } = useNuxtApp();
    return {
        baseURL: config.public.BASE_URL_SERVER,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': token.value,
            'Content-Type': withFile ? 'multipart/form-data' : 'application/json',
        },
        ...opts,
    };
}

export function useMyFetch(url, opts, withFile = false) {
    try {
        return useFetch(url, useApiFetchOptions(opts, withFile));
    } catch (e) {
        console.log(e)
    }
}

export function myFetch(url, opts, withFile = false) {
    return $fetch(url, useApiFetchOptions(opts, withFile));
}