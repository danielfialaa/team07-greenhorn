import { Router } from 'express';

import { userProfileController, } from './userProfileController';

const router = Router();
router.get('/', userProfileController);

export default router;
