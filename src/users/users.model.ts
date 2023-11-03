import { DataTypes } from 'sequelize';
import { Model, Table, Column } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @Column({ type: DataTypes.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'false', description: 'user banned or no' })
  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'reason of ban' })
  @Column({ type: DataTypes.STRING, allowNull: true })
  banReason: string;
}
