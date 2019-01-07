import db from '../../models/';

export const addTaskFormController =
  async (req, res) => {

  const task = await db.tasks.create(req.body)
    .then((response) => {
			var promises = req.body.filePath.map(function(filePath) {
				const file = db.attachments.create({
					path: filePath,
					idTask: response.get('id'),
				});
			});
			res.json({
				status: true,
			});
    }).catch( e => {
      res.json({
        status: false
      });
    });
};
