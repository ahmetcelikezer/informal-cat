import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    GraphqlModule,
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => <TypeOrmModuleOptions>config.get('database'),
    }),
  ],
})
export class AppModule {}
