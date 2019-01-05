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
      const form = db.task_history.create(req.body).catch(e => {
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
    .add(-1, 'days')
    .add(9, 'hours')
    .toDate();

  const taskSummaryMail = require('sendmail')();
  console.log('notificationDate: ' + notificationDate);
  taskSummaryMail(
    {
      from: 'no-reply@greenhorn.com',
      to: user.email,
      subject: 'New task assigned!',
      html:
        'Hi ' +
        user.firstName +
        ' ' +
        user.lastName +
        '! \n' +
        'A new task "' +
        task.name +
        '" with deadline on [' +
        req.body.dateOfDeadline +
        '] was assigned to you. Please do not forget to close task in time! \n' +
        'In case of any question visit GreenHorn application for detailed task description or contact by email task requestor - ' +
        req.user.email +
        '. ',
    },
    function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    }
  );

  const schedule = require('node-schedule');
  const notifyOneDayBeforeDeadline = schedule.scheduleJob(
    notificationDate,
    function() {
      const sendmail = require('sendmail')();
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
            'Your task "' +
            task.name +
            '" is close to defined deadline: ' +
            req.body.dateOfDeadline +
            '. Verify your task is completed and closed! \n' +
            'In case of any question visit GreenHorn application for detailed task description or contact by email task requestor - ' +
            req.user.email +
            '. ',
        },
        function(err, reply) {
          console.log(err && err.stack);
          console.dir(reply);
        }
      );
    }
  );
};
