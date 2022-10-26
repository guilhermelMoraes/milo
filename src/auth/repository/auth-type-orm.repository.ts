import { DataSource, Repository } from 'typeorm';
import { AuthProfile } from '../domain/auth-user';
import AuthUserEntity from '../infrastructure/database/user.entity';
import AuthRepository, { UserData } from './auth.repository';

class AuthTypeOrmRepository implements AuthRepository {
  private readonly _authUserRepository: Repository<AuthUserEntity>;

  constructor(dataSource: DataSource) {
    this._authUserRepository = dataSource.getRepository(AuthUserEntity);
  }

  public async signUp(userData: UserData): Promise<AuthProfile> {
    const authUser = this._authUserRepository.create(userData);
    const user = await this._authUserRepository.save(authUser);
    return {
      id: user.id,
      email: user.email,
      birthday: user.birthday,
      emailVerified: user.emailVerified,
      profilePicture: user.profilePicture,
      fullName: {
        firstName: user.firstName,
        surname: user.surname,
      },
    };
  }

  public async findUser(email: string): Promise<AuthProfile | null> {
    const userOrNull = await this._authUserRepository.findOneBy({ email });

    if (userOrNull) {
      return {
        id: userOrNull.id,
        email: userOrNull.email,
        birthday: userOrNull.birthday,
        fullName: {
          firstName: userOrNull.firstName,
          surname: userOrNull.surname,
        },
        emailVerified: userOrNull.emailVerified,
        profilePicture: userOrNull.profilePicture,
      };
    }

    return null;
  }
}

export default AuthTypeOrmRepository;
