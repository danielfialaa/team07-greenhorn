import db from '../../models/';

export const userAdministrationController = async (req, res) => {
  const data = await req.body;
  const mail = 'pivo@dobre.cz';

  const result = db.users
    .findAll({
      where: {
        email: mail,
      },
    })
    .then(response => {
      res.json({
        response,
      });
    });
};
