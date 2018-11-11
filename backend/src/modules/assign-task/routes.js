import { Router } from 'express';

import { assignTaskController } from './assignTaskController';

const router = Router();
router.post('/', assignTaskController);

export default router;
