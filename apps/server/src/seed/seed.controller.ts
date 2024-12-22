import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {} // constructor is optional in NestJS controllers

  @Get()
  getSeed() {
    return this.seedService.getSeed();
  }
}
