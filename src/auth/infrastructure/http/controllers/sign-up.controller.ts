import { injectable } from 'tsyringe';

import Controller from '../../../../common/http/controller/controller';
import Request from '../../../../common/http/controller/request';
import Response from '../../../../common/http/controller/response';
import ValidationError from '../../../../common/validation/validation.error';
import SignUpDto from '../../../services/sign-up/sign-up.dto';
import SignUpService from '../../../services/sign-up/sign-up.service';
import UserAlreadyExistsError from '../../../services/sign-up/user-already-exists';

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
      return SignUpController.badRequest(result);
    }

    if (result instanceof UserAlreadyExistsError) {
      return SignUpController.conflict(result);
    }

    return SignUpController.created();
  }
}

export default SignUpController;
