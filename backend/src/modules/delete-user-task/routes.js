import { Router } from 'express';

import { deleteUserTaskController } from './deleteUserTaskController';

const router = Router();
router.post('/', deleteUserTaskController);

export default router;
