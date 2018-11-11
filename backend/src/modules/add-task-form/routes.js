import { Router } from 'express';

import {
  addTaskFormController,
} from './addTaskFormController';

const router = Router();
router.post('/', addTaskFormController);

export default router;
