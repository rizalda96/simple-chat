export type DatabaseConfig = {
  type?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  name?: string;
  synchronize?: boolean;
};