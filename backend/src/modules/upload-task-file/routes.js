import { Router } from 'express';

import { uploadTaskFileController } from './uploadTaskFileController';

const router = Router();
router.post('/', uploadTaskFileController);

export default router;
