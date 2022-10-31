import cors from 'cors';
import express from 'express';
import logger from '../../log/pino';
import defaultErrorHandler from './default-error-handler';

import router from './router';

function createHttpServer() {
  const application = express();
  const port = process.env.HTTP_PORT ?? 8000;

  application.use(cors());
  application.use(express.json());
  application.use('/v1', router);
  application.use(defaultErrorHandler);

  application.listen(port, () => {
    logger.info(`server is running on port ${port}`, 'express');
  });
}

export default createHttpServer;
