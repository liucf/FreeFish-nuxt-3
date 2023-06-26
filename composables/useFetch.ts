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

export function useApiFetch(url, opts) {
    return useFetch(url, useApiFetchOptions(opts));
}

export function apiFetch(url, opts) {
    return $fetch(url, useApiFetchOptions(opts));
}