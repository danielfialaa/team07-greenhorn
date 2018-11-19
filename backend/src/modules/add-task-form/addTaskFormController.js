import db from '../../models/';

export const addTaskFormController =
  async (req, res) => {

    console.log("req: ", req);
    console.log("res: ", res);
  const task = await db.tasks.create(req.body)
    .then((response) => {
			console.log("id tasku: ",response.get('id'));
			var promises = req.body.filePath.map(function(filePath) {
				console.log("FilePath: ",filePath);
				const file = db.attachments.create({
					path: filePath,
					idTask: response.get('id'),
				});
			});
			res.json({
				status: true,
			});
    }).catch( e => {
			console.log('e:', e);
      res.json({
        status: false
      });
    });
//  const attachments = await db.attachment.create(req.body.attachments);
};
