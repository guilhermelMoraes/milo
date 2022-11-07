import User, { Profile } from '../../user/domain/user';
import { FullNameProps } from '../../user/domain/value-objects/fullname';

type UserData = Omit<User, 'id' | 'fullName'> & FullNameProps;

interface AuthRepository {
  findUserByEmail(email: string): Promise<null | User>;
  signUp(userData: UserData): Promise<Profile>;
}

export default AuthRepository;
export { UserData };
