import db from '../../models';

export const assignUserUploadsRoutes = async (req, res) => {

	req.body.filePath.map( (filePath) => {
		const file = db.attachments.create({
			path: filePath,
			idAssignedTask: req.body.assignedTaskId,
		});
	})
	res.json({
		status: true,
	});
};
