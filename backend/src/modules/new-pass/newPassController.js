import db from '../../models/';

export const newPassController = async (req, res) => {
  const bcrypt = require('bcrypt');

  var hash = await bcrypt.hashSync(req.body.password, 10);
  db.users
    .update(
      { password: hash },
      {
        where: { password: req.body.userLink },
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

};
