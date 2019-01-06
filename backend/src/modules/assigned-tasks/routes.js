import { Router } from 'express';

import { assignedTasksController } from './assignedTasksController'

const router = Router({mergeParams: true});
router.get('/', assignedTasksController)


export default router;
