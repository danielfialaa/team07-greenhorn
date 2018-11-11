import { Router } from 'express';

import { departmentListController } from './departmentListController';

const router = Router();
router.get('/', departmentListController);

export default router;
