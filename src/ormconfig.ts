import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: false,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  migrationsRun: true,
} as DataSourceOptions;
