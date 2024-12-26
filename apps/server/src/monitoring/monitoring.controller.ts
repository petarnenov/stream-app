import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}
  @Post()
  create(@Body() createMonitoringDto: CreateMonitoringDto) {
    console.log('hit the createMonitoring method in MonitoringController!');
    //console.log('Raw body: ', createMonitoringDto);
    return this.monitoringService.create(createMonitoringDto);
  }

  @Get()
  findAll() {
    return this.monitoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoringService.findOne(id);
  }

  @Delete()
  reset(@Query('clear') clear: string = 'false') {
    console.log('hit the resetMonitoring method in MonitoringController!');
    if (clear === 'true') {
      return this.monitoringService.clear();
    }
    return 'Monitoring data not cleared';
  }
}
