import { Router } from 'express';

import {
  addGroupFormController,
} from './addGroupFormController';

const router = Router();
router.post('/', addGroupFormController);

export default router;
