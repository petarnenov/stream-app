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

    //Send alert message to Slack channel fe-monitoring
    //const message = createMonitoringDto.message;
    //this.slackService.sendMessage(message);

    return 'error data saved successfully';
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
