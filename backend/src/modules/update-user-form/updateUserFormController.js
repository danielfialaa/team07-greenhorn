import db from '../../models/';

export const updateUserFormController =
  async (req, res) => {

  const form = await db.users.update((
		{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      dob: req.body.dob
    },
		{
      where: {
        email: req.body.email
      }
		}
	));

	// const form = await req.body;


  res.json({
    status: true,
    form,
  });
};
