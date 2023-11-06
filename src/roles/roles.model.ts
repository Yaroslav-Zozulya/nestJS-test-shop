import { DataTypes } from 'sequelize';
import { BelongsToMany, Model, Table, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user-roles.model';
import { User } from 'src/users/users.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'administrator',
    description: 'description for role',
  })
  @Column({ type: DataTypes.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
