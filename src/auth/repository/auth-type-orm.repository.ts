import { injectable, registry } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import postgresDataSource from '../../common/infrastructure/database/connection';
import User, { Profile } from '../../user/domain/user';
import UserEntity from '../../user/infrastructure/database/user.entity';
import AuthRepository, { UserData } from './auth.repository';

@injectable()
@registry([
  {
    token: DataSource,
    useValue: postgresDataSource,
  },
])
class AuthTypeOrmRepository implements AuthRepository {
  private readonly _authUserRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this._authUserRepository = dataSource.getRepository(UserEntity);
  }

  public async signUp(userData: UserData): Promise<Profile> {
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

  public async findUserByEmail(email: string): Promise<User | null> {
    const userOrNull = await this._authUserRepository.findOneBy({ email });

    if (userOrNull) {
      const { firstName, surname, ...rest } = userOrNull;
      return {
        fullName: {
          firstName,
          surname,
        },
        ...rest,
      };
    }

    return null;
  }
}

export default AuthTypeOrmRepository;
