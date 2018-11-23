import { Router } from 'express';

import { taskDetailController } from './taskDetailController';

const router = Router({mergeParams: true});
router.get('/', taskDetailController);

export default router;
