import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '../config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}


  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configDatabase = this.configService.get('database', { infer: true });
    const configApp = this.configService.get('app', { infer: true });
    
    return {
      type: configDatabase.type,
      host: configDatabase.host,
      port: configDatabase.port,
      username: configDatabase.username,
      password: configDatabase.password,
      database: configDatabase.name,
      synchronize: configDatabase.synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: configApp.nodeEnv !== 'production',
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      cli: {
        entitiesDir: 'src',

        // subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions;
  }
}