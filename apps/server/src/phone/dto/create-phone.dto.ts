import { IsNumber, IsString } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  price: string;
}
