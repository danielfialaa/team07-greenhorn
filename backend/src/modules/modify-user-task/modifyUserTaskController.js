import db from '../../models/';
import moment from 'moment';

export const modifyUserTaskController = async (req, res) => {
  const data = await req.body;

  if (req.body.status == 'DONE') {
    const result = db.task_history
      .update(
        {
          status: req.body.status,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then(response => {
        // response = JSON.stringify(response)
        // response = JSON.parse(response)
        res.json({
          response,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (req.body.status == 'TBD') {
    const result = db.task_history
      .update(
        {
          dateOfCompletion: req.body.dateOfCompletion,
          status: req.body.status,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then(response => {})
      .catch(error => {
        console.log(error);
      });

    const taskHistory = await db.task_history.findOne({
      attributes: ['idTask', 'idUser', 'dateOfDeadline'],
      where: { id: req.body.id },
    });

    const task = await db.tasks.findOne({
      attributes: ['name'],
      where: { id: taskHistory.idTask },
    });

    const user = await db.users.findOne({
      attributes: ['firstName', 'lastName', 'email'],
      where: { id: taskHistory.idUser },
    });

    res.json({
      status: true,
      result,
      task,
      taskHistory,
      user,
    });

    const sendmail = require('sendmail')();
    sendmail(
      {
        from: 'no-reply@greenhorn.com',
        to: user.email,
        subject: 'Task status changed',
        html:
          'Hi ' +
          user.firstName +
          ' ' +
          user.lastName +
          '! \n' +
          'Your task "' +
          task.name +
          '" status was changed to - ' +
          req.body.status +
          ' - TO BE DONE, with deadline date set to [' +
          moment(taskHistory.dateOfDeadline).format('YYYY-MM-DD') +
          ']. For futher information visit GreenHorn application.',
      },
      function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      }
    );
  }

  if (req.body.status != 'TBD' && req.body.status != 'DONE') {
    const result = db.task_history
      .update(
        {
          dateOfCompletion: req.body.dateOfCompletion,
          status: req.body.status,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then(response => {
        res.json({
          response,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
