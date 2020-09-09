import { Router } from 'express';
import AdminRouter from './admin.router';
import PublicRouter from './public.router';
import CompanyRouter from './company.router';

const router = Router();

router.use('/admin', AdminRouter);
router.use('/companies', CompanyRouter);
router.use('/public', PublicRouter);

export default router;
