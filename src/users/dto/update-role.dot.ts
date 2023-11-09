import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    example: 'MODERATOR',
    description: 'user role',
  })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;
}
