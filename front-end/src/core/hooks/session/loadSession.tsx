import { SessionModels } from '@starlight/core';
import { getRequest } from '../request/getRequest';
import { storeSession } from './storeSession';
import { useNavigate } from 'react-router-dom';

export const loadSession = async () => {
    if (localStorage.getItem('starlight-session') == null)
        return;
 
    var res = await getRequest<SessionModels>('users/verify', {
        authorization: localStorage.getItem('starlight-session')
    });

    if (res == null) {
        localStorage.removeItem('starlight-session');
        return;
    }

    storeSession(res.data);
}