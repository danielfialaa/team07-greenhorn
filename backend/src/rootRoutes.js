import { Router } from 'express';

import productRoutes from './modules/products/routes';
import contactFormRoutes from './modules/contact-form/routes';
import loginFormRoutes from './modules/login-form/routes';
import addUserFormRoutes from './modules/add-user-form/routes';
import userListRoutes from './modules/user-list/routes';
import newPassRoutes from './modules/new-pass/routes';
import resetPassRoutes from './modules/reset-pass/routes';

const router = Router();


router.use('/api/auth', loginFormRoutes);
router.use('*', (req, res, next) => {
  if(true) {

    console.log('req.user existuje');
    next();
  } else {
    console.log('nic totální dno');
  }
});
router.use('/api/addUser', addUserFormRoutes);
router.use('/api/userList', userListRoutes);
router.use('/api/products', productRoutes);
router.use('/api/contactForm', contactFormRoutes);
router.use('/api/newPass', newPassRoutes);
router.use('/api/resetPass', resetPassRoutes);


export default router;
