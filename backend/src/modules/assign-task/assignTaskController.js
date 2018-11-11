import db from '../../models/';

export const assignTaskController = async (req, res) => {
  console.log('req: ', req);
  console.log('res: ', res);
  const form = await db.task_history
    .create(req.body)
    .then(response => {
      res.json({
        status: true,
        response,
      });
    })
    .catch(e => {
      console.log('e:', e);
      res.json({
        status: false,
      });
    });
  console.log(form);
};
