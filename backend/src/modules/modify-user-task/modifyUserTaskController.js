import db from '../../models/';

export const modifyUserTaskController = async (req, res) => {
  const data = await req.body;

  const result = db.task_history
    .update(
      {
        dateOfCompletion: req.body.dateOfCompletion,
        status: req.body.status
      },
      {
      where: {
        id: req.body.id
      }
    })
    .then(response => {
      // response = JSON.stringify(response)
      // response = JSON.parse(response)
      res.json({
        response,
      });
    }).catch(error => {
      console.log(error);
    });
};
