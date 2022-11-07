/* eslint-disable import/first */
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { createDbConnection } from './common/infrastructure/database/connection';
import createHttpServer from './common/infrastructure/http/application';

(async (): Promise<void> => {
  await createDbConnection();
  createHttpServer();
})();
