import { Router } from 'express';

import { addUserFormController } from './addUserFormController';

const router = Router();
router.post('/', addUserFormController);

export default router;
