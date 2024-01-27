import { DtoInterface } from './dtoInterface';
import { InfoDto } from './infoDto';

export class SessionDto implements DtoInterface {
    public token: string;
    public user: InfoDto;
    public permission?: Array<string>;
}