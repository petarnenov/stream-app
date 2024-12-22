import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { SeedModule } from './seed/seed.module';
import { PhoneModule } from './phone/phone.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import {PostgresService} from './postgres/postgres.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresModule],
      useFactory: async (postgresService: PostgresService) => postgresService.getConfiguration() as TypeOrmModuleOptions,
      inject: [PostgresService],
    }),
    AccountModule,
    SeedModule,
    PhoneModule,
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
