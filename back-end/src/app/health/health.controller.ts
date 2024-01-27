import { FastifyRequest, FastifyReply } from 'fastify';
import { SingleType } from '../../core/types/single.type';
import { UserEntity } from '../../core/database/entities/user.entity';
import { Bootstrap } from '../../main';
import { StatusModels } from './models/status.models';
import { ResponseUtils } from '../../core/utils/response.utils';
import { LocaleModels } from './models/locale.models';
import { SettingsModel } from './models/settings.models';
import { SettingEntity } from '../../core/database/entities/settings.entity';
import { ListType } from '../../core/types/list.type';

export class HealthController {
    public async online(request: FastifyRequest, response: FastifyReply): Promise<void> {
        const usersCounter: number = await Bootstrap.database.connection.getRepository(UserEntity).count({
            where: {
                status: '1'
            }
        });

        const result: SingleType<StatusModels> = {
            content: {
                online: usersCounter
            }
        };

        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }

    public async locale(request: FastifyRequest, response: FastifyReply): Promise<void> {
        const result: SingleType<LocaleModels> = {
            content: {
                lang: 'IT'
            }
        };

        response.statusCode = 200;
        response.send(ResponseUtils.single(result));
    }

    public async settings(request: FastifyRequest, response: FastifyReply): Promise<void> {
        const settings: Array<SettingEntity> = await Bootstrap.database.connection.getRepository(SettingEntity).find();

        if (settings.length == 0) {
            response.statusCode = 404;
            return;
        }

        const result: ListType<SettingsModel> = {
            lists: settings.map(s => {
                const setting: SettingsModel = {
                    key: s.name,
                    value: s.value
                };
                return setting;
            })
        }

        response.statusCode = 200;
        response.send(ResponseUtils.list(result));
    }
}