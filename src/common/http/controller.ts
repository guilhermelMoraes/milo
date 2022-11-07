/* eslint-disable class-methods-use-this */
import BaseError from '../errors/base-error';
import Logger from '../log/logger';
import logger from '../log/pino';
import ValidationError from '../validation/validation.error';
import HttpStatus from './http-status.enum';
import Request from './request';
import Response, { FailResponse, SuccessResponse } from './response';

interface CatchErrors {
  handleWithCatch(request: Request): Promise<Response>;
}

abstract class Controller implements CatchErrors {
  private readonly _logger: Logger = logger;

  public abstract handle(request: Request): Promise<Response>;

  public async handleWithCatch(request: Request): Promise<Response> {
    try {
      const response = await this.handle(request);
      return response;
    } catch (error) {
      return this.internalServerError(error as Error);
    }
  }

  protected ok<T = unknown>(data: T): SuccessResponse<T> {
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

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

  protected unauthorized(error: BaseError): FailResponse {
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      error: error.toDetailedErrorMessage(),
    };
  }

  protected internalServerError(error: Error): FailResponse {
    this._logger.error(error);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Erro interno do servidor. Por favor, tente novamente mais tarde',
    };
  }
}

export default Controller;
