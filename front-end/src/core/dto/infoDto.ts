import { DtoInterface } from './dtoInterface';

export class InfoDto implements DtoInterface {
    username: string;
    motto?: string;
    rank?: number;
    sso?: string;
    look: string;
    currency?: Map<Number, Number>;
}