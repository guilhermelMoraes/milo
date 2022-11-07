import bcrypt from 'bcrypt';
import ValidationStatus from '../../../common/validation/validation-status';
import ValidationError from '../../../common/validation/validation.error';

interface PasswordProp {
  readonly hash: string;
}

interface PasswordCreationProps {
  password: string;
  confirmation: string;
}

class Password implements PasswordProp {
  private static readonly _MIN_LENGTH = 8;
  private static readonly _MAX_LENGTH = 80;
  private static readonly _SALT_ROUNDS = 10;

  private readonly _hash: string;

  private constructor(hash: string) {
    this._hash = hash;
  }

  public get hash(): string {
    return this._hash;
  }

  private static validate(properties: PasswordCreationProps): ValidationStatus {
    const { password, confirmation } = properties;

    for (const [key, value] of Object.entries(properties)) {
      const size = value.length;
      if (size < this._MIN_LENGTH) {
        return {
          succeed: false,
          error: new ValidationError(
            `${key} deve ter, no mínimo, oito caracteres`,
            key,
            value
          ),
        };
      }

      if (size > this._MAX_LENGTH) {
        return {
          succeed: false,
          error: new ValidationError(
            `${key} deve ter, no máximo, oitenta caracteres`,
            key,
            value
          ),
        };
      }
    }

    if (password !== confirmation) {
      return {
        succeed: false,
        error: new ValidationError(
          'Senha e confirmação diferentes',
          'confirmation',
          confirmation
        ),
      };
    }

    return {
      succeed: true,
    };
  }

  private static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this._SALT_ROUNDS);
  }

  public static async create(
    properties: PasswordCreationProps
  ): Promise<ValidationError | Password> {
    const validation = this.validate(properties);

    if (validation.succeed) {
      const hash = await this.hash(properties.password);
      return new Password(hash);
    }

    return validation.error;
  }
}

export default Password;
export { PasswordCreationProps, PasswordProp };
