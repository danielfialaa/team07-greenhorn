import { Router } from 'express';

import { userGroupsController } from '../user-groups/userGroupsController';
import { userGroupsUpdateController } from '../user-groups/userGroupsUpdateController';


const router = Router({mergeParams: true});

router.get('/', userGroupsController);
router.post('/update', userGroupsUpdateController)

export default router;
