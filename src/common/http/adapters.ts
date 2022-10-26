import {
  Handler,
  NextFunction,
  Request as Req,
  Response as Res,
} from 'express';
import { SchemaOf } from 'yup';
import validationByContext from '../validation/validation-by-context';
import Controller from './controller/controller';
import HttpStatus from './controller/http-status.enum';
import Request from './controller/request';
import { isFailResponse } from './controller/response';

function controller(controllerInstance: Controller): Handler {
  return async (req: Req, res: Res): Promise<void> => {
    const appRequest: Request = {
      body: req.body,
    };

    const response = await controllerInstance.handle(appRequest);

    res
      .status(response.statusCode)
      .json(isFailResponse(response) ? response.error : response.data);
  };
}

function validationMiddleware<T>(schema: SchemaOf<T>): Handler {
  return async (req: Req, res: Res, next: NextFunction): Promise<void> => {
    const validationStatus = await validationByContext(req.body, schema);
    if (validationStatus.succeed) {
      next();
      return;
    }

    res
      .status(HttpStatus.BAD_REQUEST)
      .json(validationStatus.error.toDetailedErrorMessage());
  };
}

const expressAdapters = {
  controller,
  validationMiddleware,
};

export default expressAdapters;
