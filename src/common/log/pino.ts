/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import pretty from 'pino-pretty';
import BaseError from '../errors/base-error';
import Logger from './logger';

const stream = pretty({
  ignore: 'pid,hostname',
});

const pinoLogger = pino({}, stream);

const logger: Logger = {
  error: (error: BaseError | Error): void => {
    if (error instanceof BaseError) {
      pinoLogger.error(error.toDetailedErrorMessage());
    } else {
      pinoLogger.error(error);
    }
  },
  info: (message: string, tag?: string): void => {
    const withTag = tag ? `[${tag}] ` : '';
    pinoLogger.info(`${withTag}${message}`);
  },
};

export default logger;
