import { Router } from 'express';

import { userAdministrationController } from './userAdministrationController';

const router = Router({mergeParams: true});
console.log('admin');
router.get('/', userAdministrationController);

export default router;
