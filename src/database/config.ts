import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entities from '../entities';

export const databaseConfig: PostgresConnectionOptions = {
  database: 'chat',
  entities: Object.values(entities),
  host: 'localhost',
  namingStrategy: new SnakeNamingStrategy(),
  password: '1234',
  port: 5432,
  schema: 'chat',
  synchronize: true,
  type: 'postgres',
  username: 'postgres',
};

export const databaseConfigFactory = (): PostgresConnectionOptions => ({
  database: process.env.DATABASE_NAME,
  entities: Object.values(entities),
  host: process.env.DATABASE_HOST,
  namingStrategy: new SnakeNamingStrategy(),
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  schema: process.env.DATABASE_SCHEMA,
  synchronize: true,
  type: 'postgres',
  username: process.env.DATABASE_USER,
});

export default databaseConfig;
