import { Router } from 'express';

import { doneInfoController } from '../task-info/taskInfoController';

const router = Router({mergeParams: true});
router.get('/', doneInfoController);


export default router;
