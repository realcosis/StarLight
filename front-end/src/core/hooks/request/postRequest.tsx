import { ResponseType } from '@starlight/core';

export const postRequest = async <T,>(url: string, body: {}, headers?: {}): Promise<ResponseType<T>> => {
    if (headers == null) {
        headers = {
            'access-control-allow-origin': window.origin
        };
    }
    
    // @ts-ignore
    const apiUrl = StarLightConfig['api.url'];
    const res = await fetch(apiUrl + url, {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(body),
        credentials: 'include'
    });

    var json = await res.json();

    return {
        status: json.status,
        data: json.data as T
    };
}