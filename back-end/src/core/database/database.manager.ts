import { Bootstrap } from '../../main';
import { DataSource } from 'typeorm';
import { LoggerManager } from '../logger/logger.manager';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionNameEntity } from './entities/permission_name.entity';
import { UserEntity } from './entities/user.entity';
import { SettingEntity } from './entities/settings.entity';

export class DatabaseManager {
    private _logger: LoggerManager = new LoggerManager('Database');
    private _connection: DataSource;

    public async connect(): Promise<void> {
        try {
            let dataSource = new DataSource({
                type: 'mysql',
                host: Bootstrap.config.configuration.database.host,
                port: Bootstrap.config.configuration.database.port,
                username: Bootstrap.config.configuration.database.user,
                password: Bootstrap.config.configuration.database.password,
                database: Bootstrap.config.configuration.database.source,
                synchronize: false,
                supportBigNumbers: true,
                entities: [
                    UserEntity,
                    PermissionNameEntity,
                    PermissionEntity,
                    SettingEntity
                ]
            })
            this._connection = await dataSource.initialize();
            if (this._connection.isInitialized)
                this._logger.info("Connection to database established!");
        } catch {
            this._logger.error('Connection to database failed! Closing...!');
            process.exit(1);
        }
    }

    public get connection(): DataSource {
        return this._connection;
    }
}