/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import createHttpServer from './infrastructure/http/application';

(() => {
  createHttpServer();
})();
