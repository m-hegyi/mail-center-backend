import { Router } from 'express';
import { register } from '../controller/public.controller';

const router = Router();

router.post('/register', register);

export default router;
