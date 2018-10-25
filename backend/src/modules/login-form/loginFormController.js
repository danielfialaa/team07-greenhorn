import db from '../../models/';

export const loginFormController =
  async (req, res) => {

  const data = await req.body;

  const bcrypt = require('bcrypt');


  const result = db.Users.findOne({
    where: {
      email: data.email,
    }
  }).then((response) => {

        if (response) {

          const hash = response.password;

          bcrypt.compare(data.password, hash, function(error, success) {

              if (success) {
                  res.json({
                    status: true,
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
