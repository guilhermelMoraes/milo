import ValidationError from './validation.error';

type ValidationSucceeded = {
  succeed: true;
};

type ValidationFailed = {
  succeed: false;
  error: ValidationError;
};

type ValidationStatus = ValidationFailed | ValidationSucceeded;

export default ValidationStatus;
