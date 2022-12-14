import { DataSource } from 'typeorm';
import UserEntity from '../../../user/infrastructure/database/user.entity';
import logger from '../../log/pino';

const {
  DATABASE_DB,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: String(DATABASE_HOST),
  port: Number(DATABASE_PORT),
  username: String(DATABASE_USER),
  password: String(DATABASE_PASSWORD),
  database: String(DATABASE_DB),
  entities: [UserEntity],
  synchronize: true,
});

async function createDbConnection(): Promise<boolean> {
  try {
    const { isInitialized } = await postgresDataSource.initialize();
    logger.info('database connection open', 'typeorm');
    return isInitialized;
  } catch (error) {
    logger.error(error as Error);
    return false;
  }
}

export default postgresDataSource;
export { createDbConnection };
