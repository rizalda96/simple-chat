import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database/database.config';
import { DatabaseConfig } from './config/database/database-config.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import authConfig from './config/auth/auth-config';

import * as fs from 'fs';
import * as path from 'path';


// <database-block>
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});
// </database-block>

const loadModulesV1FromDirectory = (directory: string): any[] => {
  const importModules = [];
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const modules = fs.readdirSync(directory + '/' + file);
    for (const module of modules) {            
      if (module.endsWith('.module.js')) {
        const modulePath = path.join(directory + '/' + file, module);
        const mod = require(modulePath);                
        importModules.push(mod[Object.keys(mod)[0]]);
      }
    }
  }

  return importModules;
}

const modulesV1Directory = path.join(__dirname, 'modules/v1');
const importedModulesV1 = loadModulesV1FromDirectory(modulesV1Directory);


@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    ...importedModulesV1,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
