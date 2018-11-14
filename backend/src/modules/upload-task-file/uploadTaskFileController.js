import db from '../../models/';

export const uploadTaskFileController = async (req, res) => {
	console.log(req.file);
	res.json({
		filePath: req.file.destination+req.file.filename,
	})
};
