import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Allow } from 'class-validator';

export class Tokens {
  @ApiProperty()
  @IsNotEmpty()
  token1: string;

  @Allow()
  @ApiProperty()
  token2?: string;
}
