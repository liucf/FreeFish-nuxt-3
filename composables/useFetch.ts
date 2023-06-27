export function useApiFetchOptions(opts: any) {
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

export function useApiFetch(url: string, opts: any) {
    return useFetch(url, useApiFetchOptions(opts));
}

export function apiFetch(url: string, opts: any) {
    return $fetch(url, useApiFetchOptions(opts));
}