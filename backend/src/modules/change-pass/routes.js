import { Router } from 'express';

import { changePassController } from './changePassController';

const router = Router();
router.post('/', changePassController);

export default router;
