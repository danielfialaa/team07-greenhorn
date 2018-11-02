import { Router } from 'express';

import {
  updateUserFormController,
} from './updateUserFormController';

const router = Router();
router.post('/', updateUserFormController);

export default router;
