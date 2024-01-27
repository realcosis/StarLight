import { FastifyRequest, FastifyReply } from 'fastify';
import { LoggerManager } from '../logger/logger.manager';
import { ListType } from "../types/list.type";
import { ResponseType } from "../types/response.type";
import { SingleType } from "../types/single.type";

export class ResponseUtils {
    public static ResponseLogger(request: FastifyRequest, response: FastifyReply): void {
        if (request.method == 'OPTIONS')
            return;

        const logger = new LoggerManager('Response');
        logger.debug(`Loaded response by request`);
        logger.debug(`Request URL: ${request.url}`);
        logger.debug(`Request Method: ${request.method}`);
        logger.debug(`Response Code: ${response.statusCode}`);
    }

    public static Authorization(request: FastifyRequest, response: FastifyReply, next): void {
        if (request.method == 'OPTIONS')
            return;

        if (String.isNullOrWhitespace(request.headers.authorization))
            return;

        console.log(request.headers.authorization); 
        next();
    }

    private static makeJSON(object: ResponseType): string {
        return JSON.stringify({
            status: object.status,
            data: object.data
        }, null, 3);
    }

    public static message(message: string): string {
        let split: Array<string> = message.split(':');
        let send: ResponseType = {
            status: split[0],
            data: split[1]
        }
        return this.makeJSON(send);
    }

    public static single<T>(object: SingleType<T>): string {
        let send: ResponseType = {
            status: 'success',
            data: object.content
        }
        return this.makeJSON(send);
    }

    public static list<T>(object: ListType<T>): string {
        let send: ResponseType = {
            status: 'success',
            data: object.lists
        }
        return this.makeJSON(send);
    }
}