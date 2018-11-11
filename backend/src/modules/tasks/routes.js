import { Router } from 'express';

import { taskController } from './taskController';

const router = Router();
router.get('/', taskController);

export default router;
