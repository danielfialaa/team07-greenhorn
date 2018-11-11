import db from '../../models/';

export const taskListController = async (req, res) => {
  const data = await req.body;

  const result = db.tasks
    .findAll({ attributes: ['id', 'name'] })
    .then(response => {
      response = JSON.stringify(response);
      response = JSON.parse(response);
      res.json({
        response,
      });
    });
};
