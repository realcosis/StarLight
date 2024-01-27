import { DtoInterface } from '../dto/dtoInterface';

export interface ObjectInterface {
    set(data: DtoInterface): void;

    get(): DtoInterface;

    flush(): void;
}