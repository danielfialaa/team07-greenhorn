import db from '../../models/';
import randomstring from 'randomstring';


export const resetPassController =
  async (req, res) => {
		console.log("here");

		var rPass = randomstring.generate(20);
	db.users.update(
		{password: rPass},
		{where:
			{ email: req.body.email}
		}
	).then((result) =>{
		const sendmail = require('sendmail')();
		sendmail({
				from: 'no-reply@greenhorn.com',
				to: req.body.email,
				subject: 'Password reset GreenHorn',
				html: 'Your password has been reset. Please use link below to reset your password.\n'+
						'http://dev.frontend.team07.vse.handson.pro/NewPassword/'+ rPass
					,
			}, function(err, reply) {
				console.log(err && err.stack);
				console.dir(reply);
				res.json({
					status: false,
					result,
			});
		});
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
};
