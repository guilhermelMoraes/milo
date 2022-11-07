import { Router } from 'express';
import expressAdapters from '../../../common/http/adapters';
import { signUpSchema } from '../../services/sign-up/sign-up.dto';
import SignUpController from './controllers/sign-up.controller';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  expressAdapters.validationMiddleware(signUpSchema),
  expressAdapters.controller(SignUpController)
);

export default authRouter;
