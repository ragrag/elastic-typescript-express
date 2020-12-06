import { ConnectionOptions } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
const dbConnection: ConnectionOptions = {
  url: env === 'production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [env === 'production' ? 'build/entities/*{.ts,.js}' : 'src/entities/*{.ts,.js}'],
  migrations: [env === 'production' ? 'build/migrations/*{.ts,.js}' : 'src/migrations/*{.ts,.js}'],
  subscribers: [env === 'production' ? 'build/subscribers/*{.ts,.js}' : 'src/subscribers/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};

export { dbConnection };
