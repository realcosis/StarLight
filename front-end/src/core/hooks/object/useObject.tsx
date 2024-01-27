import { objectList } from '../../../api/objectList';

export const useObject = <T,>(type: string) => {
    return objectList.get(type) as T;
}