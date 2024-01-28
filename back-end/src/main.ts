import * as fs from 'fs';
import fastify, { FastifyRequest } from 'fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import * as fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { UsersRouter } from './app/users/users.router';
import { LoggerManager } from './core/logger/logger.manager';
import { DatabaseManager } from './core/database/database.manager';
import { ConfigManager } from './core/config/config.manager';
import { ResponseUtils } from './core/utils/response.utils';
import { LocalizationManager } from './core/localization/localization.manager';
import { HealthRouter } from './app/health/health.router';
import '@starlight/core/src/extension/string.extension';

export class Bootstrap {
    private static readonly _logger: LoggerManager = new LoggerManager('Bootstrap');
    private static _config: ConfigManager;
    private static _database: DatabaseManager;
    private static _localization: LocalizationManager;

    public static async startServer(): Promise<void> {
        process.title = 'StarLight';

        try {
            console.clear();
            console.log('\x1b[35m');
            console.log(' ███████╗████████╗ █████╗ ██████╗ ██╗     ██╗ ██████╗ ██╗  ██╗████████╗');
            console.log(' ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║     ██║██╔════╝ ██║  ██║╚══██╔══╝');
            console.log(' ███████╗   ██║   ███████║██████╔╝██║     ██║██║  ███╗███████║   ██║');
            console.log(' ╚════██║   ██║   ██╔══██║██╔══██╗██║     ██║██║   ██║██╔══██║   ██║');
            console.log(' ███████║   ██║   ██║  ██║██║  ██║███████╗██║╚██████╔╝██║  ██║   ██║');
            console.log(' ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝');
            console.log();
            console.log(` StarLight v1.0.0 - Developed by RealCosis`);
            console.log();

            this._logger.info('StarLight is starting...!');

            this._config = new ConfigManager();
            this._database = new DatabaseManager();
            await this._database.connect();
            this._localization = new LocalizationManager();
            await this._localization.load();

            let server = fastify();
            if (this._config.configuration.http.ssl) {
                server = fastify({
                    https: {
                        cert: fs.readFileSync('./resources/ssl/cert.pem'),
                        key: fs.readFileSync('./resources/ssl/key.pem') 
                    }
                });
            }

            server.register(fastifyCors, {
                origin: this._config.configuration.http.origin,
                credentials: true
            });
            server.register(fastifyCookie, {
                secret: this._config.configuration.system.secret
            });
            server.register(fastifyCsrf, {
                cookieOpts: {
                    domain: this._config.configuration.http.domain,
                    signed: true,
                    secure: true,
                    sameSite: 'none'
                },
                csrfOpts: {
                    hmacKey: this._config.configuration.system.secret
                },
                sessionPlugin: '@fastify/cookie',
                getToken: (req: FastifyRequest) => {
                    return req.headers['csrf'].toString();
                }
            });

            server.register(HealthRouter, {
                prefix: '/health'
            });

            server.register(UsersRouter, {
                prefix: '/users'
            });
 
            if (this._config.configuration.system.debug) {
                this._logger.debug('StarLight was started with debug mode!');
                server.addHook('onResponse', ResponseUtils.ResponseLogger);
            }

            server.listen({
                host: this._config.configuration.http.host,
                port: this._config.configuration.http.port
            }, () => {
                this._logger.info(`StarLight is started on ${this._config.configuration.http.host}:${this._config.configuration.http.port}!`);
            });
        } catch (e) {
            this._logger.error(e)
        }
    }

    public static get database(): DatabaseManager {
        return this._database;
    }

    public static get config(): ConfigManager {
        return this._config;
    }

    public static get localization(): LocalizationManager {
        return this._localization;
    }
}

Bootstrap.startServer();