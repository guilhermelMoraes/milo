import BaseError from '../errors/base-error';

interface Logger {
  error(error: BaseError | Error): void;
  info(message: string, tag?: string): void;
}

export default Logger;
