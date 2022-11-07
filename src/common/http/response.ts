import { SerializedErrorMessage } from '../errors/base-error';
import HttpStatus from './http-status.enum';

type BaseResponse = {
  statusCode: HttpStatus;
};

type SuccessResponse<T = unknown> = BaseResponse & {
  data?: T;
};

type FailResponse = BaseResponse & {
  error: SerializedErrorMessage | string;
};

type Response<T = unknown> = FailResponse | SuccessResponse<T>;

function isFailResponse(response: Response): response is FailResponse {
  return 'error' in response;
}

export default Response;

export { FailResponse, SuccessResponse, isFailResponse };
