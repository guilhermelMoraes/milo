import AuthUser, { AuthProfile } from '../domain/auth-user';
import { FullNameProps } from '../domain/value-objects/fullname';

type UserData = Omit<AuthUser, 'id' | 'fullName'> & FullNameProps;

interface AuthRepository {
  findUser(email: string): Promise<null | AuthProfile>;
  signUp(userData: UserData): Promise<AuthProfile>;
}

export default AuthRepository;
export { UserData };
