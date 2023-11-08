import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'value' })
  value: string;

  @ApiProperty({
    example: 'user with administrator rights ',
    description: 'description',
  })
  description: string;
}
