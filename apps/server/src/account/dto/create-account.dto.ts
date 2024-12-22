import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  owner: string;

  @IsNumber()
  balance: number;

  @IsString()
  currency: string;
}
