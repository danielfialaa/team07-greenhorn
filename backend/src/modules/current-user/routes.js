import { Router } from 'express';

import { currentUserController } from './currentUserController';

const router = Router();
router.get('/', currentUserController);

export default router;
