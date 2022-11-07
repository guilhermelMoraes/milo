import ValidationStatus from '../../../common/validation/validation-status';
import ValidationError from '../../../common/validation/validation.error';

interface EmailProps {
  readonly email: string;
}

class Email implements EmailProps {
  private static readonly _VALID_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private readonly _email: string;

  private constructor(email: string) {
    this._email = email;
  }

  public get email(): string {
    return this._email;
  }

  public static isEmail(vo: unknown): vo is Email {
    return vo instanceof Email;
  }

  private static validate(email: string): ValidationStatus {
    if (!this._VALID_EMAIL.test(email)) {
      return {
        succeed: false,
        error: new ValidationError('E-mail fornecido inválido', 'email', email),
      };
    }

    return {
      succeed: true,
    };
  }

  public static create(email: string): ValidationError | Email {
    const validationStatus = this.validate(email);

    if (validationStatus.succeed) {
      return new Email(email);
    }

    return validationStatus.error;
  }
}

export default Email;
