import { Router } from 'express';
import expressAdapters from '../../../common/http/adapters';
import postgresDataSource from '../../../common/infrastructure/database/connection';
import AuthTypeOrmRepository from '../../repository/auth-type-orm.repository';
import { signUpSchema } from '../../services/sign-up/sign-up.dto';
import SignUpService from '../../services/sign-up/sign-up.service';
import SignUpController from './sign-up.controller';

const authRouter = Router();

const authUserRepository = new AuthTypeOrmRepository(postgresDataSource);
const signUpService = new SignUpService(authUserRepository);
const signUpController = new SignUpController(signUpService);

authRouter.post(
  '/sign-up',
  expressAdapters.validationMiddleware(signUpSchema),
  expressAdapters.controller(signUpController)
);

export default authRouter;
