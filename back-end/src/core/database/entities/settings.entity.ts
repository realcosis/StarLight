import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('starlight_settings')
export class SettingEntity {
    @PrimaryColumn({
        name: 'key',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public name: string;

    @Column({
        name: 'value',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public value: string;
}