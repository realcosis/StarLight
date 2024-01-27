import { ResponseType } from '@starlight/core';

export const getRequest = async <T,>(url: String, headers?: {}): Promise<ResponseType<T>> => {
    if (headers == null) {
        headers = {
            'access-control-allow-origin': window.origin
        };
    }

    // @ts-ignore
    const apiUrl = StarLightConfig['api.url'];
    const res = await fetch(apiUrl + url, {
        method: 'GET',
        mode: 'cors',
        headers: headers,
        credentials: 'include'
    });

    if (res.status != 200)
        return null;

    var json = await res.json();

    return {
        status: json.status,
        data: json.data as T
    };
}