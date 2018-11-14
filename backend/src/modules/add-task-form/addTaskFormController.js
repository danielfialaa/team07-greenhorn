import db from '../../models/';

export const addTaskFormController =
  async (req, res) => {

    console.log("req: ", req);
    console.log("res: ", res);
  const task = await db.tasks.create(req.body)
    .then((response) => {
			console.log("id tasku: ",response.get('id'));
			const file = db.attachments.create({
				path: req.body.filePath,
				idTask: response.get('id'),
			}).then((response) => {
				res.json({
					status: true,
					response,
				});
			}).catch(e => {
				console.log('e:', e);
				res.json({
					status: false
				});
			});
    }).catch( e => {
			console.log('e:', e);
      res.json({
        status: false
      });
    });
//  const attachments = await db.attachment.create(req.body.attachments);
};
