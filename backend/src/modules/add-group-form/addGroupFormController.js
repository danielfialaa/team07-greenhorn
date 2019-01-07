import db from '../../models/';

export const addGroupFormController =
  async (req, res) => {

  const task = await db.groups.create({
		groupName: req.body.groupName,
	}).then((response) => {
			var promises = req.body.selectedTasks.map(function(task) {
				const taskInGroup = db.taskGroupBelonging.create({
					taskId: task,
					groupId: response.get('id'),
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
