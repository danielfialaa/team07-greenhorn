import { Router } from 'express';

import { taskListController, } from './taskListController';

const router = Router();
router.get('/', taskListController);

export default router;
