import db from '../../models/';
import jwt from 'jsonwebtoken';

export const loginFormController = async (req, res) => {
  const data = await req.body;

  const bcrypt = require('bcrypt');

  const result = db.users
    .findOne({
      where: {
        email: data.email,
      },
    })
    .then(response => {
      if (response) {
        const hash = response.password;
        bcrypt.compare(data.password, hash, function(error, success) {
          if (success) {
            var tokenData = {
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              department: response.department,
            };

            console.log(tokenData);

            //jwt env promenna nejde
            var encodedToken = jwt.sign(tokenData, '2', {
              expiresIn: 60 * 60 * 12, // expires in 12 hours
            });

            console.log(encodedToken);

            res.json({
              status: true,
              token: encodedToken,
              isAdmin: response.isAdmin,
            });
          } else {
            res.json({
              status: false,
            });
          }
        });
      } else {
        res.json({
          status: false,
        });
      }
    });
};
