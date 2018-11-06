import db from '../../models/';

export const currentUserController =
  async (req, res) => {
    console.log("here");

  const result = db.users.findOne({
    where: {
      email: req.user.email,
  }
	}).then((response) => {

      console.log(response);
    res.json({
      response,
    });
  });
}
