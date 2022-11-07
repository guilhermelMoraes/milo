/* eslint-disable no-useless-constructor */
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { inject, injectable } from 'tsyringe';

import ValidationError from '../../../common/validation/validation.error';
import { Profile } from '../../../user/domain/user';
import Birthday from '../../../user/domain/value-objects/birthday';
import Email from '../../../user/domain/value-objects/email';
import FullName from '../../../user/domain/value-objects/fullname';
import Password from '../../../user/domain/value-objects/password';
import auth from '../../infrastructure/firebase/config';
import AuthRepository from '../../repository/auth.repository';
import SignUpDto from './sign-up.dto';
import UserAlreadyExistsError from './user-already-exists.error';

@injectable()
class SignUpService {
  private readonly _authUserRepository: AuthRepository;

  constructor(
    @inject('AuthRepository')
    authUserRepository: AuthRepository
  ) {
    this._authUserRepository = authUserRepository;
  }

  public async execute(
    signUpData: SignUpDto
  ): Promise<ValidationError | UserAlreadyExistsError | Profile> {
    const emailOrError = Email.create(signUpData.email);

    if (Email.isEmail(emailOrError)) {
      const userExists = await this._authUserRepository.findUserByEmail(
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

    try {
      await createUserWithEmailAndPassword(
        auth,
        (emailOrError as Email).email,
        signUpData.password
      );

      const { email, birthday, fullName, id, emailVerified, profilePicture } =
        await this._authUserRepository.signUp({
          email: (emailOrError as Email).email,
          firstName: (fullNameOrError as FullName).firstName,
          surname: (fullNameOrError as FullName).surname,
          birthday: (birthdayOrError as Birthday).birthday,
          hash: (passwordOrError as Password).hash,
          emailVerified: signUpData.emailVerified,
          profilePicture: signUpData.profilePicture,
        });

      return {
        id,
        email,
        emailVerified,
        profilePicture,
        fullName,
        birthday,
      };
    } catch (error) {
      if ((error as AuthError).code === 'auth/email-already-exists') {
        return new UserAlreadyExistsError(signUpData.email);
      }

      throw error;
    }
  }
}

export default SignUpService;
