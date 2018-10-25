import db from '../../models/';

export const addUserFormController =
  async (req, res) => {

  const bcrypt = require('bcrypt');

  var hash = bcrypt.hashSync('123456', 10);
  req.body.password = hash;
  const form = await db.Users.create(req.body);
	// const form = await req.body;


  res.json({
    status: true,
    form,
  });
};
