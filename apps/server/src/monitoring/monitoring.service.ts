/* eslint-disable @typescript-eslint/no-unused-vars */
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
  async create(createMonitoringDto: CreateMonitoringDto) {
    const monitoringData =
      this.monitoringRepository.create(createMonitoringDto);
    const savedMonitoringData =
      await this.monitoringRepository.save(monitoringData);

    const message = savedMonitoringData.message;
    const url = `http://192.168.0.164:8080/monitoring/${savedMonitoringData.id}`;

    //Uncomment to send alert message to Slack channel fe-monitoring
    // this.slackService.sendMessage(
    //   `${message}\nVisit: ${url} for more details.`,
    // );

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
