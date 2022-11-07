import { Router } from 'express';
import authRouter from '../../../auth/infrastructure/http/routes';

const router = Router();

router.use('/auth', authRouter);

export default router;
