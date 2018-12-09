import { Router } from 'express';

import { userGroupsController } from '../user-groups/userGroupsController';


const router = Router({mergeParams: true});

router.get('/', userGroupsController);

export default router;
