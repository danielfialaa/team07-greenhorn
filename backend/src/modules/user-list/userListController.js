import db from '../../models/';

export const userListController = async (req, res) => {
  const data = await req.body;

  const result = db.users
    .findAll({
      include: [
        {
          model: db.departments,
          attributes: ['departmentName'],
        },
      ],
    })
    .then(response => {
      res.json({
        response,
      });
    });
};
