import { Router } from 'express';
const jwt = require('jsonwebtoken');


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

  console.log(req.get('Authorization'));
  const x = jwt.verify(req.get('Authorization'), '2', (err, decoded) => {
    if(res) {

      console.log(err);

      next();
    } else {
      console.log('unauthorized');
      res.status(401).send('unauthorized');
    }
  });

});
router.use('/api/addUser', addUserFormRoutes);
// router.use('/api/updateUser', updateUserFormRoutes);
router.use('/api/userList', userListRoutes);
router.use('/api/products', productRoutes);
router.use('/api/contactForm', contactFormRoutes);
router.use('/api/newPass', newPassRoutes);
router.use('/api/resetPass', resetPassRoutes);


export default router;
