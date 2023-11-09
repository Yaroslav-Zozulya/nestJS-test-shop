import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'incorrect email format' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, { message: 'password length must be from 4 to 16' })
  readonly password: string;
}
