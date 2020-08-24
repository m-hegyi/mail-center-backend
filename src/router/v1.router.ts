import { Router } from 'express';
import AdminRouter from './admin.router';
import PublicRouter from './public.router';

const router = Router();

router.use('/admin', AdminRouter);
router.use('/public', PublicRouter);

export default router;
