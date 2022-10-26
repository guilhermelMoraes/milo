import BaseError from '../../errors/base-error';
import ValidationError from '../../validation/validation.error';
import HttpStatus from './http-status.enum';
import Request from './request';
import Response, { FailResponse, SuccessResponse } from './response';

abstract class Controller {
  public abstract handle(request: Request): Promise<Response>;

  protected static badRequest(error: ValidationError): FailResponse {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      error: error.toDetailedErrorMessage(),
    };
  }

  protected static created<T = unknown>(data?: T): SuccessResponse<T> {
    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  public static conflict(error: BaseError): FailResponse {
    return {
      statusCode: HttpStatus.CONFLICT,
      error: error.toDetailedErrorMessage(),
    };
  }
}

export default Controller;
