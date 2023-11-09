import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;

  @ApiProperty({ example: 'spam', description: 'user ban reason' })
  readonly banReason: string;
}
