import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresService } from './postgres.service';

@Module({
  imports: [ConfigModule],
  exports: [PostgresService],
  providers: [PostgresService],
})
export class PostgresModule {}
