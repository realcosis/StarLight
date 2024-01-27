import { FastifyInstance } from 'fastify';
import { LoggerManager } from '../../core/logger/logger.manager';
import { HealthController } from './health.controller';

export async function HealthRouter(fastify: FastifyInstance) {
    const logger: LoggerManager = new LoggerManager('HealthRouter');
    const controller: HealthController = new HealthController();

    fastify.route({
        method: 'GET',
        url: '/online',
        handler: controller.online
    });

    fastify.route({
        method: 'GET',
        url: '/lang',
        handler: controller.locale
    });

    fastify.route({
        method: 'GET',
        url: '/settings',
        handler: controller.settings
    });

    logger.info('The router for health was successfully loaded!');
}