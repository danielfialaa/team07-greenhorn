import db from '../../models/';
import randomstring from 'randomstring';

export const addUserFormController = async (req, res) => {
  req.body.password = randomstring.generate(20);
  const form = await db.users.create(req.body);
  // const form = await req.body;
  const sendmail = require('sendmail')();

  sendmail(
    {
      from: 'no-reply@greenhorn.com',
      to: req.body.email,
      subject: 'You have been invited into GreenHorn!',
      html:
        'Hi ' +
        req.body.firstName +
        ' ' +
        req.body.lastName +
        '\n\n' +
        'You have been invited into GreenHorn. Please use link below to setup your password.\n' +
        'http://dev.frontend.team07.vse.handson.pro/NewPassword/' +
        req.body.password,
    },
    function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    }
  );

  res.json({
    status: true,
    form,
  });
};
