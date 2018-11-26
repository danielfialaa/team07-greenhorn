import { Router } from 'express';

import { taskDetailController } from './taskDetailController';
import { taskUpdateController } from './taskUpdateController';

const router = Router({mergeParams: true});
router.get('/', taskDetailController);
router.post('/update', taskUpdateController);

export default router;
