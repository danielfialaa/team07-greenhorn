import db from '../../models/';

export const uploadTaskFileController = async (req, res) => {
	res.json({
		filePath: req.file.destination.substr(19)+req.file.filename,
	})
};
