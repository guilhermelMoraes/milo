import { FullNameProps } from './value-objects/fullname';

interface AuthUser {
  id: string;
  email: string;
  emailVerified?: boolean;
  fullName: FullNameProps;
  birthday: Date;
  hash: string;
  profilePicture?: string;
}

type AuthProfile = Omit<AuthUser, 'hash'>;

export default AuthUser;
export { AuthProfile };
