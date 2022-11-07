import { injectable, container } from 'tsyringe';

import Controller from '../../../../common/http/controller';
import Response from '../../../../common/http/response';
import Request from '../../../../common/http/request';
import ValidationError from '../../../../common/validation/validation.error';
import SignUpDto from '../../../services/sign-up/sign-up.dto';
import SignUpService from '../../../services/sign-up/sign-up.service';
import UserAlreadyExistsError from '../../../services/sign-up/user-already-exists.error';
import AuthTypeOrmRepository from '../../../repository/auth-type-orm.repository';

container.register('AuthRepository', {
  useClass: AuthTypeOrmRepository,
});

@injectable()
class SignUpController extends Controller {
  private readonly _signUpService: SignUpService;

  constructor(signUpService: SignUpService) {
    super();
    this._signUpService = signUpService;
  }

  public async handle(request: Request<SignUpDto>): Promise<Response> {
    const result = await this._signUpService.execute(request.body as SignUpDto);

    if (ValidationError.isValidationError(result)) {
      return this.badRequest(result);
    }

    if (result instanceof UserAlreadyExistsError) {
      return this.conflict(result);
    }

    return this.created();
  }
}

export default container.resolve(SignUpController);
