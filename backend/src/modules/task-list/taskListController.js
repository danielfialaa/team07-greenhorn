import db from '../../models/';

export const taskListController = async (req, res) => {

  const data = await req.body;
  let id = await req.params.id;
  if (id == 'undefined') {
    const preResult = await db.users
      .findOne({
        where: { email: req.user.email },
      })
      .then(response => {
        id = response.id;
      });
  }


  const tasks = await db.task_history
    .findAll({
      where: { idUser: id },
      include: [
        {
          model: db.tasks,
          include: [
            {
              model: db.departments,
            },
          ]
        },
        {
          model: db.users,
        }
    ],
    }).then(response => {
      res.json({
        response,
      });
    });

};