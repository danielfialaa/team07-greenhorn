import { Router } from 'express';
import { downloadTaskFileController } from './downloadTaskFileController';

const router = Router();
console.log('jsem v routes');
router.get('/', downloadTaskFileController);

export default router;
