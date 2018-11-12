import db from '../../models/';

export const assignTaskController = async (req, res) => {
  console.log('req: ', req);
  console.log('res: ', res);
	const reporter = await db.users.findAll({
		where: {
			email: req.user.email,
		},
	}).then(response => {
		console.log(response[0].id);
		req.body.idReporter = response[0].id;
		const form = db.task_history
			.create(req.body)
			.then(response => {
				res.json({
					status: true,
					response,
				});
			})
			.catch(e => {
				console.log('e:', e);
				res.json({
					status: false,
				});
			});
		console.log(form);
	});

};
