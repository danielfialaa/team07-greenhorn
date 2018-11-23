import { Router } from 'express';

import { modifyUserTaskController } from './modifyUserTaskController';

const router = Router();
router.post('/', modifyUserTaskController);

export default router;
