import { FullNameProps } from './value-objects/fullname';

interface User {
  readonly id: string;
  email: string;
  emailVerified?: boolean;
  fullName: FullNameProps;
  birthday: Date;
  hash: string;
  profilePicture?: string;
}

type Profile = Omit<User, 'hash'>;

export default User;
export { Profile };
