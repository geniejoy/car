import { PoolConfig } from 'pg';

export function getDatabaseConfig(): PoolConfig {
  const databaseConfig: PoolConfig = {
    host: 'localhost',
    port: 5432,
    database: 'ATM',
    user: 'nobody',
    password: 'nobody',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  };
  if (process.env.DATABASE_HOST) {
    console.log('Use DB Environment Config');
    databaseConfig.host = process.env.DATABASE_HOST;
    databaseConfig.port = +process.env.DATABASE_PORT;
    databaseConfig.database = process.env.DATABASE_NAME;
    databaseConfig.user = process.env.DATABASE_USER;
    databaseConfig.password = process.env.DATABASE_PASSWORD;
  }
  return databaseConfig;
}
