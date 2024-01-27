import * as configuration from '../../resources/configuration.json';

export class ConfigManager {
    public get configuration(): typeof configuration {
        return configuration;
    }
}