import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneGateway } from './phone.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhoneGateway, PhoneService],
})
export class PhoneModule {}
