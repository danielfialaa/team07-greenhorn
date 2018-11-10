import db from '../../models/';

export const currentUserController =
  async (req, res) => {

  const data = await req.body;

  const result = db.users.findAll({
    where: {
      email: req.user.email,
  }
	}).then((response) => {
    res.json({
      response,
    });
  });
}
