import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: 'email' })
  readonly email: string;
  @ApiProperty({ example: '12345678', description: 'password' })
  readonly password: string;
}
