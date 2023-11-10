import { DataTypes } from 'sequelize';
import {
  BelongsToMany,
  Model,
  Table,
  Column,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { Post } from 'src/posts/posts.model';

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

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
