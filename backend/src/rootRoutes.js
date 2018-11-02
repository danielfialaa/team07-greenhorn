import { Router } from 'express';
//import jwt from 'jsonwebtoken';


import productRoutes from './modules/products/routes';
import contactFormRoutes from './modules/contact-form/routes';
import loginFormRoutes from './modules/login-form/routes';
import addUserFormRoutes from './modules/add-user-form/routes';
import userListRoutes from './modules/user-list/routes';
import newPassRoutes from './modules/new-pass/routes';
import resetPassRoutes from './modules/reset-pass/routes';

const router = Router();


router.use('/api/auth', loginFormRoutes);
//dummy route in progress
router.use('*', (req, res, next) => {

  if (req.get('Authorization')) {

    console.log(req.get('Authorization'));
    next();

  } else {

    console.log(req.get('Authorization'));
    res.status(401).send('unauthorized');

  }

  // jwt.verify(req.token, '2', (err, user) => {
  //   if(user) {
  //     console.log('req.user existuje');
  //     next();
  //   } else {
  //     console.log('unauthorized');
  //     res.status(401).send('unauthorized');
  //   }
  // });
});
router.use('/api/addUser', addUserFormRoutes);
router.use('/api/userList', userListRoutes);
router.use('/api/products', productRoutes);
router.use('/api/contactForm', contactFormRoutes);
router.use('/api/newPass', newPassRoutes);
router.use('/api/resetPass', resetPassRoutes);


export default router;
