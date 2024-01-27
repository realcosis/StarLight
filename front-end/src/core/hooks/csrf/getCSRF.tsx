import { TokenModels, SingleType, ResponseType } from '@starlight/core';
import { getRequest } from '../request/getRequest';

export const getCSRF = async () => {
    var res = await getRequest<TokenModels>('users/token');

    if (res != null)
        sessionStorage.setItem('csrf', res.data.token);
}