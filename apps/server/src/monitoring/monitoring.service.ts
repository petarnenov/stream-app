import { Injectable } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(Monitoring)
    private readonly monitoringRepository: Repository<Monitoring>,
  ) {}
  create(createMonitoringDto: CreateMonitoringDto) {
    console.log('createMonitoringDto: ', createMonitoringDto);
    return this.monitoringRepository.save(createMonitoringDto);
  }

  findAll() {
    return this.monitoringRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.monitoringRepository.findOneBy({ id });
  }

  clear() {
    return this.monitoringRepository.clear();
  }
}
