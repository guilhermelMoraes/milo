import BaseError, {
  SerializedErrorMessage,
} from '../../../common/errors/base-error';

class UserAlreadyExistsError extends BaseError {
  private readonly _email: string;

  constructor(email: string) {
    super(`${email} já está associado a um usuário`);

    this._email = email;
    this.name = 'UserAlreadyExistsError';
  }

  public toDetailedErrorMessage(): SerializedErrorMessage {
    return {
      message: this.message,
      type: this.name,
      failedProperty: 'email',
      value: this._email,
      suggestion:
        'Utilize um novo endereço de e-mail que ainda não esteja associado a um usuário',
    };
  }
}

export default UserAlreadyExistsError;
