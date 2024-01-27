import { settingsList } from '../../../api/settingsList';

export const readSettings = (key: string) => {
    return settingsList.get(key);
}