import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { PermissionNameEntity } from './permission_name.entity';

@Entity('starlight_permissions')
export class PermissionEntity {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: number;

    @Column({
        name: 'permission'
    })
    public permissionId: number;

    @Column({
        name: 'rank'
    })
    public rankId: number;

    @OneToOne(() => PermissionNameEntity)
    @JoinColumn({
        name: 'permission',
        referencedColumnName: 'id'
    })
    public permission: PermissionNameEntity;
}