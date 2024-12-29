import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import { PostgresService } from './postgres/postgres.service';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresModule],
      useFactory: async (postgresService: PostgresService) =>
        postgresService.getDevelopmentConfiguration() as TypeOrmModuleOptions,
      inject: [PostgresService],
    }),
    PostgresModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
