import { Router } from 'express';

import { taskListController, } from './taskListController';
import { assignedTasksController } from './taskListController'

const router = Router({mergeParams: true});
router.get('/', taskListController);

export default router;
