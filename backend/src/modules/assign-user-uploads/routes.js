import { Router } from 'express';

import { assignUserUploadsRoutes } from './assignUserUploadsRoutes';

const router = Router();
router.post('/', assignUserUploadsRoutes);

export default router;
