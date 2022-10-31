/* eslint-disable class-methods-use-this */
import BaseError from '../errors/base-error';
import ValidationError from '../validation/validation.error';
import Response, { FailResponse, SuccessResponse } from './response';
import HttpStatus from './http-status.enum';
import Request from './request';
import Logger from '../log/logger';
import logger from '../log/pino';

abstract class Controller {
  private readonly _logger: Logger = logger;

  public abstract handle(request: Request): Promise<Response>;

  protected badRequest(error: ValidationError): FailResponse {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      error: error.toDetailedErrorMessage(),
    };
  }

  protected created<T = unknown>(data?: T): SuccessResponse<T> {
    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  protected conflict(error: BaseError): FailResponse {
    return {
      statusCode: HttpStatus.CONFLICT,
      error: error.toDetailedErrorMessage(),
    };
  }

  protected internalServerError(error: BaseError): FailResponse {
    this._logger.error(error);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.toDetailedErrorMessage(),
    };
  }
}

export default Controller;
