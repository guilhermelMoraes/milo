import User, { AuthProfile } from '../../user/domain/user';
import { FullNameProps } from '../../user/domain/value-objects/fullname';

type UserData = Omit<User, 'id' | 'fullName'> & FullNameProps;

interface AuthRepository {
  findUser(email: string): Promise<null | AuthProfile>;
  signUp(userData: UserData): Promise<AuthProfile>;
}

export default AuthRepository;
export { UserData };
