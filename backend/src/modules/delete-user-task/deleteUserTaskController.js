import db from '../../models/';

export const deleteUserTaskController = async (req, res) => {
  const data = await req.body;

  const result = db.task_history
    .destroy({
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
