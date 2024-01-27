import { SessionModels } from '@starlight/core';
import { SessionDto } from '../../dto/sessionDto';
import { SessionObject } from '../../object/sessionObject';
import { useObject } from '../object/useObject';

export const storeSession = (res: SessionModels) => {
    if (localStorage.getItem('starlight-session') == null)
        localStorage.setItem('starlight-session', res.token);

    const session: SessionDto = {
        token: res.token,
        user: {
            username: res.user["nickname"],
            motto: res.user["mission"],
            rank: res.user["rank"],
            sso: res.user["rank"],
            look: res.user["avatar"]
        }
    };
    useObject<SessionObject>('session').set(session);
}