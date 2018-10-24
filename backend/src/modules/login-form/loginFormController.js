import db from '../../models/';

export const loginFormController =
  async (req, res) => {

  // const form = await db.LoginForm.create(req.body);
  const form = await req.body;
	const email = await req.body.email;
  const password = await req.body.password;

  const bcrypt = require('bcrypt');
  //zatím jen hashování, to patří do registrace, ne sem
  var hash = bcrypt.hashSync(password, 10);

  res.json({
    status: true,
    email,
    hash,
  });
};
