import { UserEntity } from '../../../core/database/entities/user.entity'

export type SessionModels = {
    user: UserEntity;
    token: string;
    permissions?: Array<string>;
}