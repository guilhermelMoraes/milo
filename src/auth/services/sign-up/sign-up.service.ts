import { createUserWithEmailAndPassword } from 'firebase/auth';
import ValidationError from '../../../common/validation/validation.error';
import { AuthProfile } from '../../domain/auth-user';
import Birthday from '../../domain/value-objects/birthday';
import Email from '../../domain/value-objects/email';
import FullName from '../../domain/value-objects/fullname';
import Password from '../../domain/value-objects/password';
import auth from '../../infrastructure/firebase/auth/config';
import AuthRepository from '../../repository/auth.repository';
import SignUpDto from './sign-up.dto';
import UserAlreadyExistsError from './user-already-exists';

class SignUpService {
  private readonly _authUserRepository: AuthRepository;

  constructor(authUserRepository: AuthRepository) {
    this._authUserRepository = authUserRepository;
  }

  public async execute(
    signUpData: SignUpDto
  ): Promise<ValidationError | UserAlreadyExistsError | AuthProfile> {
    const emailOrError = Email.create(signUpData.email);

    if (Email.isEmail(emailOrError)) {
      const userExists = await this._authUserRepository.findUser(
        emailOrError.email
      );

      if (userExists) {
        return new UserAlreadyExistsError(userExists.email);
      }
    }

    const birthdayOrError = Birthday.create(signUpData.birthday);
    const fullNameOrError = FullName.create({
      firstName: signUpData.firstName,
      surname: signUpData.surname,
    });
    const passwordOrError = await Password.create({
      password: signUpData.password,
      confirmation: signUpData.confirmation,
    });

    for (const isError of [
      emailOrError,
      birthdayOrError,
      fullNameOrError,
      passwordOrError,
    ]) {
      if (ValidationError.isValidationError(isError)) {
        return isError;
      }
    }

    const user = this._authUserRepository.signUp({
      email: (emailOrError as Email).email,
      birthday: (birthdayOrError as Birthday).birthday,
      firstName: (fullNameOrError as FullName).firstName,
      surname: (fullNameOrError as FullName).surname,
      emailVerified: signUpData.emailVerified,
      profilePicture: signUpData.profilePicture,
      hash: (passwordOrError as Password).hash,
    });

    const signUpStatus = createUserWithEmailAndPassword(
      auth,
      (emailOrError as Email).email,
      (passwordOrError as Password).hash
    );

    const result = await Promise.all([user, signUpStatus]);
    return result[0];
  }
}

export default SignUpService;
