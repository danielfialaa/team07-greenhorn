import db from '../../models/';
import moment from 'moment';

export const assignTaskController = async (req, res) => {
  const reporter = await db.users
    .findAll({
      where: {
        email: req.user.email,
      },
    })
    .then(response => {
      req.body.idReporter = response[0].id;
      const form = db.task_history
        .create(req.body)
        // .then(response => {})
        .catch(e => {
          console.log('e:', e);
          res.json({
            status: false,
          });
        });
      console.log('form' + form);
      console.log('response' + response);
    });

  const user = await db.users.findOne({
    where: { id: req.body.idUser },
  });

  const task = await db.tasks.findOne({
    where: { id: req.body.idTask },
  });

  res.json({
    status: true,
    reporter,
    user,
  });

  const notificationDate = moment(req.body.dateOfDeadline, 'YYYY-MM-DD')
    .add(-6, 'days')
    .add(-41, 'minutes')
    .toDate();

  const schedule = require('node-schedule');
  const sch = schedule.scheduleJob(notificationDate, function() {
    const sendmail = require('sendmail')();
    console.log('date: ' + date);
    console.log('notificationDate: ' + notificationDate);
    console.log('notDate: ' + notDate);
    sendmail(
      {
        from: 'no-reply@greenhorn.com',
        to: user.email,
        subject: 'Task is close to deadline period!',
        html:
          'Hi ' +
          user.firstName +
          ' ' +
          user.lastName +
          '! \n' +
          'You have not finished task "' +
          task.name +
          '" which is close to defined deadline: ' +
          req.body.dateOfDeadline +
          '. Please do not forget to close task in time! \n' +
          'In case of any question visit GreenHorn application for detailed task description or contact by email task requestor - ' +
          req.user.email +
          '. ',
      },
      function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      }
    );
  });
};
