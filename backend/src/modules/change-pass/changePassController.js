import db from '../../models/';
import jwt from 'jsonwebtoken';

export const changePassController = async (req, res) => {
  const data = await req.body;
  const bcrypt = require('bcrypt');

  const result = db.users
    .findOne({
      where: {
        email: req.user.email,
      },
    })
    .then(response => {
      if (response) {
        const hash_current = response.password;
        bcrypt.compare(req.body.password_current, hash_current, function(
          error,
          success
        ) {
          if (success) {
            var hash_new = bcrypt.hashSync(req.body.password, 10);
            const form = db.users
              .update(
                { password: hash_new },
                {
                  where: {
                    email: req.user.email,
                  },
                }
              )
              .then(result => {
                res.json({
                  status: true,
                  result,
                });
              })
              .catch(e => {
                res.json({
                  status: false,
                  result,
                });
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
