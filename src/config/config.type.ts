import { AppConfig } from './app-config.type';
import { DatabaseConfig } from './database/database-config.type';
// import { AuthConfig } from '../auth/config/auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  // auth: AuthConfig;
  database: DatabaseConfig;
};