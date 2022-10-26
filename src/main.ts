/* eslint-disable import/first */
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import createHttpServer from './common/http/application';
import { createDbConnection } from './common/infrastructure/database/connection';

(async (): Promise<void> => {
  if (await createDbConnection()) {
    createHttpServer();
  }
})();
