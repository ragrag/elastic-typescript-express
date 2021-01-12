import { ConnectionOptions } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
const dbConnectionUrls = {
  production: process.env.DATABASE_URL_PROD,
  development: process.env.DATABASE_URL_DEV,
  testing: process.env.DATABASE_URL_TEST,
};

const dbConnection: ConnectionOptions = {
  url: dbConnectionUrls[env],
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [env === 'production' ? 'build/entities/*{.ts,.js}' : 'src/entities/*{.ts,.js}'],
  migrations: [env === 'production' ? 'build/db/migrations/*{.ts,.js}' : 'src/db/migrations/*{.ts,.js}'],
  subscribers: [env === 'production' ? 'build/db/subscribers/*{.ts,.js}' : 'src/db/subscribers/*{.ts,.js}'],
  // migrationsRun: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
  },
  ssl: env === 'production',
  extra: {
    rejectUnauthorized: !(env === 'production'),
    ssl: env === 'production',
  },
};

export = dbConnection;
