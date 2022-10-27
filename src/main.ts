/* eslint-disable import/first */
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import createHttpServer from './common/http/application';
import { createDbConnection } from './common/infrastructure/database/connection';

(async (): Promise<void> => {
  createHttpServer();
  await createDbConnection();
})();
