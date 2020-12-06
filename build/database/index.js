"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const env = process.env.NODE_ENV || 'development';
const dbConnection = {
    url: env === 'production' ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL_DEV,
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [env === 'production' ? 'build/entity/*{.ts,.js}' : 'src/entity/*{.ts,.js}'],
    migrations: [env === 'production' ? 'build/migration/*{.ts,.js}' : 'src/migration/*{.ts,.js}'],
    subscribers: [env === 'production' ? 'build/subscriber/*{.ts,.js}' : 'src/subscriber/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=index.js.map