import { SessionDto } from '../dto/sessionDto';
import { ObjectInterface } from './objectInterface';

export class SessionObject implements ObjectInterface {
    public data: SessionDto;

    set(value: SessionDto): void {
        this.data = value;
    }

    get(): SessionDto {
        return this.data;
    }

    flush(): void {
        this.data = null;
    }
}