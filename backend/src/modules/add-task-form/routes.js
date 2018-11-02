export { Router } from 'express';

import {
  createAddTaskFormController,
} from './addTaskFormController';

const router = Router();
router.post('/', createAddTaskFormController);

export default router;
