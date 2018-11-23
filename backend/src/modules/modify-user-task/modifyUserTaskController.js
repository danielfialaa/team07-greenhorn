import db from '../../models/';

export const modifyUserTaskController = async (req, res) => {
  const data = await req.body;

  if(req.body.status == 'DONE') {
    const result = db.task_history.update(
      {
        status: req.body.status
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(response => {
      // response = JSON.stringify(response)
      // response = JSON.parse(response)
      res.json({
        response,
      });
    }).catch(error => {
      console.log(error);
    });
}

  if(req.body.status != 'DONE') {
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
  }
};
