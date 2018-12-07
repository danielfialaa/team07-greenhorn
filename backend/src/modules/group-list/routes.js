import { Router } from 'express';

import { groupListController } from './groupListController';

const router = Router();
router.get('/', groupListController);

export default router;
