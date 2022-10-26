import ValidationStatus from '../../../common/validation/validation-status';
import ValidationError from '../../../common/validation/validation.error';

interface BirthdayProps {
  birthday: Date;
}

class Birthday implements BirthdayProps {
  private static readonly _MIN_AGE_ALLOWED = 13;
  private readonly _birthday: Date;

  private constructor(birthday: Date) {
    this._birthday = birthday;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  private static getMinimumAge(): number {
    const minimumAge = new Date();
    minimumAge.setFullYear(minimumAge.getFullYear() - this._MIN_AGE_ALLOWED);

    return minimumAge.getTime();
  }

  private static validate(birthday: Date): ValidationStatus {
    if (new Date(birthday).getTime() < this.getMinimumAge()) {
      return {
        succeed: true,
      };
    }

    return {
      succeed: false,
      error: new ValidationError(
        'Idade mínima permitida de treze anos',
        'birthday',
        birthday
      ),
    };
  }

  public static create(birthday: Date): ValidationError | Birthday {
    const validationStatus = this.validate(birthday);

    if (validationStatus.succeed) {
      return new Birthday(birthday);
    }

    return validationStatus.error;
  }
}

export default Birthday;
