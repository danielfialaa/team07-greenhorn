import db from '../../models/';

export const updateUserFormController = async (req, res) => {
  const result = await db.users
    .update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        dob: req.body.dob,
      },
      {
        where: {
          email: req.user.email,
        },
      }
    )
    .then(result => {
      res.json({
        status: true,
        result,
      });
    })
    .catch(e => {
      res.json({
        status: false,
        result,
      });
    });
};
