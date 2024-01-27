export class LoggerManager {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public info(message: string): void {
        var date: Date = new Date();
        var format: string = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('\x1b[32m', `${this._name} - ${message} - ${format}\x1b[0m`);
    }

    public error(message: string): void {
        var date: Date = new Date();
        var format: string = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('\x1b[31m', `${this._name} - ${message} - ${format}\x1b[0m`);
    }

    public debug(message: string): void {
        var date: Date = new Date();
        var format: string = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('\x1b[36m', `${this._name} - ${message} - ${format}\x1b[0m`);
    }

    public warning(message: string): void {
        var date: Date = new Date();
        var format: string = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('\x1b[33m', `${this._name} - ${message} - ${format}\x1b[0m`);
    }
}