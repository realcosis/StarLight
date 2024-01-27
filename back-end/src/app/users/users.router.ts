import { FastifyInstance } from 'fastify';
import { LoggerManager } from '../../core/logger/logger.manager';
import { UsersController } from './users.controller';

export async function UsersRouter(fastify: FastifyInstance) {
    const logger: LoggerManager = new LoggerManager('UserRouter');
    const controller: UsersController = new UsersController();

    fastify.route({
        method: 'POST',
        url: '/login',
        onRequest: [
            fastify.csrfProtection
        ],
        handler: controller.login
    });

    fastify.route({
        method: 'GET',
        url: '/token',
        handler: controller.token
    });

    fastify.route({
        method: 'GET',
        url: '/verify',
        handler: controller.verify
    });

    fastify.route({
        method: 'GET',
        url: '/profile/:username',
        handler: controller.profile
    });

    logger.info('The router for users was successfully loaded!');
}