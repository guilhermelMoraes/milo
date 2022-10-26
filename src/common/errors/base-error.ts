type SerializedErrorMessage = {
  type: string;
  message: string;
  suggestion?: string;
  [key: string]: string | undefined;
};

abstract class BaseError extends Error {
  public abstract toDetailedErrorMessage(): SerializedErrorMessage;
}

export default BaseError;
export { SerializedErrorMessage };
