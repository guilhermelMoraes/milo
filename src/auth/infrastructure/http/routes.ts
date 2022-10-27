import { Router } from 'express';
import { container } from 'tsyringe';
import expressAdapters from '../../../common/http/adapters';
import AuthTypeOrmRepository from '../../repository/auth-type-orm.repository';
import { signUpSchema } from '../../services/sign-up/sign-up.dto';
import SignUpController from './controllers/sign-up.controller';

container.register('AuthRepository', {
  useClass: AuthTypeOrmRepository,
});

const authRouter = Router();

authRouter.post(
  '/sign-up',
  expressAdapters.validationMiddleware(signUpSchema),
  expressAdapters.controller(container.resolve(SignUpController))
);

export default authRouter;
