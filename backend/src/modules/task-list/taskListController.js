import db from '../../models/';

export const taskListController =
  async (req, res) => {

  const data = await req.body;

  const result = db.task_history.findAll({
		include: [{
			model: db.users,
      required: true,
			where: { email: data.email }
		}]

	}).then((response) => {

    console.log(response)
    // response = JSON.stringify(response)
		// response = JSON.parse(response)
    res.json({
      response,
    });
  });
}
