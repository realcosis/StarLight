import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { SingleType, UserLoginModels, SessionModels, TokenModels, ProfileModels, AccessTokenModels } from '@starlight/core';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserEntity } from '../../core/database/entities/user.entity';
import { PermissionEntity } from '../../core/database/entities/permission.entity';
import { Bootstrap } from '../../main';
import { ResponseUtils } from '../../core/utils/response.utils';

export class UsersController {
    public async login(request: FastifyRequest, response: FastifyReply): Promise<void> {
        const body: UserLoginModels = JSON.parse(request.body.toString());

        if (body.username.length == 0) {
            response.statusCode = 400;
            response.send(ResponseUtils.message(`error:${Bootstrap.localization.localization('login')['username.required']}`));
            return;
        }

        if (body.password.length == 0) {
            response.statusCode = 400;
            response.send(ResponseUtils.message(`error:${Bootstrap.localization.localization('login')['password.required']}`));
            return;
        }

        let user: UserEntity = await Bootstrap.database.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: body.username
            }
        });
        if (user == null) {
            response.statusCode = 404;
            response.send(ResponseUtils.message(`error:${Bootstrap.localization.localization('login')['user.not_found']}`));
            return;
        }

        const password: string = (await Bootstrap.database.connection.getRepository(UserEntity).findOne({
            select: [
                'password'
            ],
            where: {
                id: user.id
            }
        })).password;
        if (!bcrypt.compareSync(body.password, password)) {
            response.statusCode = 403;
            response.send(ResponseUtils.message(`error:${Bootstrap.localization.localization('login')['user.wrong_password']}`));
            return;
        }

        var permissions = await Bootstrap.database.connection.getRepository(PermissionEntity).find({
            where: {
                rankId: user.rank
            },
            relations: [
                'permission'
            ]
        });
        
        const accessTokenModel: AccessTokenModels = {
            id: user.id,
            nickname: user.nickname,
            SSO: user.SSO,
            rank: user.rank,
            permission: permissions.map(p => p.permission.name)
        };
        const accessToken = jwt.sign(accessTokenModel, Bootstrap.config.configuration.system.secret, {
            expiresIn: '12h'
        });
        const result: SingleType<SessionModels> = {
            content: {
                user,
                token: accessToken,
                permissions: permissions.map(p => p.permission.name)
            }
        };

        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }

    public async token(request: FastifyRequest, response: FastifyReply): Promise<void> {
        const token = response.generateCsrf();
        const result: SingleType<TokenModels> = {
            content: {
                token
            }
        };

        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }

    public async profile(request: FastifyRequest, response: FastifyReply): Promise<void> {
        if (String.isNullOrWhitespace(request.params['username'])) {
            response.statusCode = 400;
            return;
        }

        const username = request.params['username'].toString();
        let user: UserEntity = await Bootstrap.database.connection.getRepository(UserEntity).findOne({
            where: {
                nickname: username
            }
        });

        if (user == null) {
            var message = Bootstrap.localization.localization('profile')['user.not_found'].format(username);
            response.statusCode = 404;
            response.send(ResponseUtils.message(`error:${message}`));
            return;
        }

        const result: SingleType<ProfileModels> = {
            content: {
                id: user.id,
                nickname: user.nickname,
                avatar: user.avatar,
                accountCreation: user.accountCreation,
                mission: user.mission
            }
        };
        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }

    public async verify(request: FastifyRequest, response: FastifyReply): Promise<void> {
        if (String.isNullOrWhitespace(request.headers.authorization)) {
            response.statusCode = 400;
            return;
        }

        const session: any = jwt.verify(request.headers.authorization, Bootstrap.config.configuration.system.secret);
        if (session == null) {
            response.statusCode = 404;
            return;
        }

        let user: UserEntity = await Bootstrap.database.connection.getRepository(UserEntity).findOne({
            where: {
                id: session.id
            }
        });
        var permissions = await Bootstrap.database.connection.getRepository(PermissionEntity).find({
            where: {
                rankId: user.rank
            },
            relations: [
                'permission'
            ]
        });

        const result: SingleType<SessionModels> = {
            content: {
                user: user,
                token: request.headers.authorization,
                permissions: permissions.map(p => p.permission.name)
            }
        };

        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }
}