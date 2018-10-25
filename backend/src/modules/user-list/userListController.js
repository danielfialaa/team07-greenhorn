import db from '../../models/';

export const userListController =
  async (req, res) => {

  const data = await req.body;

  const result = db.Users.findAll().then((response) => {
		// response = JSON.stringify(response)
		// response = JSON.parse(response)
    res.json({
      response,
    });
  });
}
