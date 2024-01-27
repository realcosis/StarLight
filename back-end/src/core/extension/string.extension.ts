interface StringConstructor {
    isNullOrWhitespace(val: string): boolean;
    randomString(length: number): string;
    format(...replacements: Array<string>): string;
}

String.isNullOrWhitespace = (val: string): boolean => {
    return val === null || val.match(/^ *$/) !== null;
}

String.randomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

String.format = (...replacements: Array<string>): string => {
    return this.replace(/{(\d+)}/g, function(match: string, number: number) { 
        return typeof replacements[number] != 'undefined' ? replacements[number] : match;
    });
}