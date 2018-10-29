import db from '../../models/';

export const newPassController =
  async (req, res) => {
		console.log("here");
  const bcrypt = require('bcrypt');

  var hash = await bcrypt.hashSync(req.body.password, 10);
  // req.body.password = hash;
	// const form = await req.body;

	db.users.update(
		{password: hash},
		{where:
			{ password: req.body.userLink}
		}
	).then((result) =>{
		console.log("pass");
			res.json({
				status: true,
				result,
		});
	}).catch(e => {
		console.log("not-pass");
			res.json({
				status: false,
				result,
		});
	});


  // res.json({
  //   status: true,
  //   form,
  // });
};
