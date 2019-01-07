import db from '../../models/';

export const assignedTasksController = async (req, res) => {
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
      where: { idRequestor: id, status: "TBD" },
      order: [
        ['dateOfDeadline', 'ASC']
      ],

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
  