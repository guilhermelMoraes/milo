import express from 'express';
import cors from 'cors';

import router from './router';

const application = express();

const port = process.env.HTTP_PORT ?? 8000;

function createHttpServer() {
  application.use(cors());
  application.use(express.json());
  application.use('/v1', router);

  application.listen(port, () => {
    console.log(
      `[express] ${new Date().toDateString()}: server is running on port ${port}`
    );
  });
}

export default createHttpServer;
