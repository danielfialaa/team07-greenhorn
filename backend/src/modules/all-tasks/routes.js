import { Router } from 'express';

import { taskInfoController } from '../task-info/taskInfoController';

const router = Router({mergeParams: true});
router.get('/', taskInfoController);


export default router;
