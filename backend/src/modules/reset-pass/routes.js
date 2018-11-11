import { Router } from 'express';

import { resetPassController } from './resetPassController';

const router = Router();
router.post('/', resetPassController);

export default router;
