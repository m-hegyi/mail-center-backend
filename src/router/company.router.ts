import { Router } from 'express';
import { getAll, get } from '../controller/company.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', get);

export default router;
