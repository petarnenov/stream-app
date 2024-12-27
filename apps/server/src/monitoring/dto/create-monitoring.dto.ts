import { IsString } from 'class-validator';
import { Source } from '../entities/monitoring.entity';

export class CreateMonitoringDto {
  @IsString()
  source: Source;

  @IsString()
  message: string;

  @IsString()
  stackTrace: string;

  @IsString()
  stepsToReproduce: string;
}
