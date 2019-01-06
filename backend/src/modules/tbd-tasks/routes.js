import { Router } from 'express';

import { tbdInfoController } from '../task-info/taskInfoController';

const router = Router({mergeParams: true});
router.get('/', tbdInfoController);


export default router;
