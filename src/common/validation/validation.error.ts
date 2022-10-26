import BaseError, { SerializedErrorMessage } from '../errors/base-error';

class ValidationError extends BaseError {
  private readonly _failedProperty: string;
  private readonly _actualValue: string;

  constructor(message: string, failedProperty: string, actualValue: unknown) {
    super(message);
    this.name = 'ValidationError';
    this._failedProperty = failedProperty;
    this._actualValue =
      typeof actualValue === 'object' && actualValue !== null
        ? JSON.stringify(actualValue)
        : String(actualValue);
  }

  public static isValidationError(error: unknown): error is ValidationError {
    if (error instanceof Error) {
      return error.name === 'ValidationError';
    }

    return false;
  }

  public toDetailedErrorMessage(): SerializedErrorMessage {
    return {
      type: this.name,
      message: this.message,
      value: this._actualValue,
      failedProperty: this._failedProperty,
    };
  }
}

export default ValidationError;
