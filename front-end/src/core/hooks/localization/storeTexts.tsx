import { LocaleModels, SingleType, ResponseType } from '@starlight/core';
import { textList } from '../../../api/textList';
import { getRequest } from '../request/getRequest';

export const storeTexts = async () => {
    var res = await getRequest<LocaleModels>('health/lang');
    
    if (res == null)
        return;

    var lang: string = res.data.lang;

    var locale = await (await fetch('/locale/' + lang + '.json')).json();
    for (let [key, val] of Object.entries(locale)) {
        if (textList.has(key))
            continue;

        textList.set(key, val);
    }
}