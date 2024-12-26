import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { Monitoring } from './entities/monitoring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Monitoring])],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class MonitoringModule {}
