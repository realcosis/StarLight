import { textList } from '../../../api/textList'

export const getTexts = (category: string, text: string) => {
    if (textList.get(category)[text] == null) 
        return 'Texture not valid';

    return textList.get(category)[text];
}