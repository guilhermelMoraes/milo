import ValidationStatus from '../../../common/validation/validation-status';
import ValidationError from '../../../common/validation/validation.error';

interface FullNameProps {
  firstName: string;
  surname: string;
}

class FullName implements FullNameProps {
  private static readonly _MIN_LENGTH = 2;
  private static readonly _MAX_LENGTH = 50;
  private static readonly _ALLOWED_CHARS = /^[a-zA-Z\s]*$/;

  private readonly _firstName: string;
  private readonly _surname: string;

  private constructor(props: FullNameProps) {
    this._firstName = props.firstName;
    this._surname = props.surname;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get surname(): string {
    return this._surname;
  }

  private static validate(properties: FullNameProps): ValidationStatus {
    for (const [key, value] of Object.entries(properties)) {
      const size = value.length;
      if (size < this._MIN_LENGTH) {
        return {
          succeed: false,
          error: new ValidationError(
            `Propriedade '${key}' deve conter, no mínimo, dois caracteres`,
            key,
            value
          ),
        };
      }

      if (size > this._MAX_LENGTH) {
        return {
          succeed: false,
          error: new ValidationError(
            `Propriedade '${key}' deve conter, no máximo, cinquenta caracteres`,
            key,
            value
          ),
        };
      }

      if (!this._ALLOWED_CHARS.test(value)) {
        return {
          succeed: false,
          error: new ValidationError(
            `'${key}' deve conter apenas letras e espaços em branco`,
            key,
            value
          ),
        };
      }
    }

    return {
      succeed: true,
    };
  }

  public static create(properties: FullNameProps): ValidationError | FullName {
    const validation = this.validate(properties);

    if (validation.succeed) {
      return new FullName(properties);
    }

    return validation.error;
  }
}

export default FullName;
export { FullNameProps };
