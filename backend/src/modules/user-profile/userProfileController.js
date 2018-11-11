import db from '../../models/';

export const userProfileController =
  async (req, res) => {

  const data = await req.body;

  const result = db.users.findById(Number(data.userId),{
		include: [{
			model: db.departments,
			attributes: ['departmentName']
		}]
	}).then((response) => {
		// response = JSON.stringify(response)
		// response = JSON.parse(response)
    res.json({
      response,
    });
  });
}
