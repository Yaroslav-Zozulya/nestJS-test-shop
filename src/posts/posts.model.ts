import { DataTypes } from 'sequelize';
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'NestJS guid', description: 'Title for post' })
  @Column({ type: DataTypes.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'NestJs is the best',
    description: 'ane content text',
  })
  @Column({ type: DataTypes.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: 'image', description: 'image' })
  @Column({ type: DataTypes.STRING, defaultValue: false })
  image: string;

  @ApiProperty({ example: '1', description: 'user id' })
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
