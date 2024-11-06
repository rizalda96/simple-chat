import { AppConfig } from './app-config.type';
import { AuthConfig } from './auth/auth-config.type';
import { DatabaseConfig } from './database/database-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};