import { registerAs } from '@nestjs/config';
import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbOptions = (): PostgresConnectionOptions =>
  ({
    logging: false,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    keepConnectionAlive: true,
    synchronize: false,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  } as PostgresConnectionOptions);

export default registerAs('dbpostgres', dbOptions);
