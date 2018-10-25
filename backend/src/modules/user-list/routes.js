import { Router } from 'express';

import { userListController, } from './userListController';

const router = Router();
router.get('/', userListController);

export default router;
