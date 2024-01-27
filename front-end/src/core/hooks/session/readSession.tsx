import { SessionObject } from '../../object/sessionObject';
import { useObject } from '../object/useObject';

export const readSession = () => {
    return useObject<SessionObject>('session').get();
}