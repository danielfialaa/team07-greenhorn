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
      console.log('pass');
      res.json({
        status: true,
        result,
      });
    })
    .catch(e => {
      console.log('not-pass');
      res.json({
        status: false,
        result,
      });
    });
};
