import db from '../../models/';

export const addGroupFormController =
  async (req, res) => {

    console.log("req: ", req);
    console.log("res: ", res);
  const task = await db.groups.create({
		groupName: req.body.groupName,
	}).then((response) => {
			console.log("id of new group: ",response.get('id'));
			var promises = req.body.selectedTasks.map(function(task) {
				console.log("TaskId: ",task);
				const taskInGroup = db.taskGroupBelonging.create({
					taskId: task,
					groupId: response.get('id'),
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
