import { Router } from 'express';

import {
  loginFormController,
} from './loginFormController';

const router = Router();
router.post('/', loginFormController);

export default router;
