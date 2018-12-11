import db from '../../models/';

export const userAdministrationController = async (req, res) => {
  const id = await req.params.id;

  const result = db.users
    .findAll({
      where: {
        id: id,
      },
    })
    .then(response => {
      res.json({
        response,
      });
    });
};
