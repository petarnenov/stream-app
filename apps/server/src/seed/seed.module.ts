import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Account])],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
