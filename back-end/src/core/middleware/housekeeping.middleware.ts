import * as jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createError } from '@fastify/error';
import { Bootstrap } from '../../main';

const NotLoggedIn = createError('SL_NOT_LOGGED', 'Non sei loggato!', 403);
const NotAuthorized = createError('SL_NOT_AUTHORIZED', 'Non sei autorizzato ad accedere!', 401);

export async function HousekeepingLogin(request: FastifyRequest, response: FastifyReply) {
    if (String.isNullOrWhitespace(request.headers.authorization))
        return response.send(NotLoggedIn());

    const user: any = jwt.verify(request.headers.authorization, Bootstrap.config.configuration.system.secret);
    
    if (!user.permission.includes('admin.login'))
        return response.send(new NotAuthorized());
}