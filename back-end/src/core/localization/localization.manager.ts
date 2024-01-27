import * as fs from 'fs';
import * as path from 'path';
import { LoggerManager } from "../logger/logger.manager";

export class LocalizationManager {
    private _logger: LoggerManager = new LoggerManager('Localization');
    private _localizationValues: Map<string, any>;

    constructor() {
        this._localizationValues = new Map<string, any>();
    }

    public async load(): Promise<void> {
        try {
            const localization: string = path.resolve(__dirname, '../../resources/localization/IT.json');
            const file = fs.readFileSync(localization);
            const jsonLang = JSON.parse(file.toString());
            for (let [key, val] of Object.entries(jsonLang)) {
                this._localizationValues.set(key, val);
            }
            this._logger.info("Localization was successfully loaded!");
        } catch {
            this._logger.error('Localization file not loaded!');
            process.exit(1);
        }
    }

    public localization(key: string): any {
        return this._localizationValues.get(key);
    } 
}