import { settingsList } from '../../../api/settingsList';
import { getRequest } from '../request/getRequest';
import { ResponseType, ListType, SettingsModel } from '@starlight/core';

export const storeSettings = async () => {
    var res = await getRequest<Array<SettingsModel>>('health/settings');

    res.data.map(s => {
        settingsList.set(s.key, s.value);
    });
}