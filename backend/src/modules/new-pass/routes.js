import { Router } from 'express';

import { newPassController } from './newPassController';

const router = Router();
router.post('/', newPassController);

export default router;
