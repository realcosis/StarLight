import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('starlight_permission_names')
export class PermissionNameEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'permission'
    })
    public name: string;

    @Column({
        name: 'description'
    })
    public desc: string;
}