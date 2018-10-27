import db from '../../models/';
import randomstring from 'randomstring';

export const addUserFormController =
  async (req, res) => {

  req.body.password = randomstring.generate(20);
  const form = await db.Users.create(req.body);
	// const form = await req.body;


  res.json({
    status: true,
    form,
  });
};
