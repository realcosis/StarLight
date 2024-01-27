import { readSettings } from '../settings/readSettings';

export const setTitle = (title: String) => {
    document.title = `${readSettings('hotel_name')} - ${title}`;
}