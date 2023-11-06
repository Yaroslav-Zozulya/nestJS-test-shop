import { DataTypes } from 'sequelize';
import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataTypes.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;
}
