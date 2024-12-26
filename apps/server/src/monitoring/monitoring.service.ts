import { Injectable } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { Repository } from 'typeorm';
import { SlackService } from './slack.service';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(Monitoring)
    private readonly monitoringRepository: Repository<Monitoring>,
    private readonly slackService: SlackService,
  ) {}
  create(createMonitoringDto: CreateMonitoringDto) {
    const monitoringData =
      this.monitoringRepository.create(createMonitoringDto);
    this.monitoringRepository.save(monitoringData);
    console.log('MonitoringData: ', monitoringData.source);
    //this.slackService.sendMessage('hi');
    return 'record created successfully!';
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
