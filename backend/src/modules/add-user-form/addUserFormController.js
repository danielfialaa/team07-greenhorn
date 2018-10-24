import db from '../../models/';

export const addUserFormController =
  async (req, res) => {

  const form = await req.body;

  const firstName = form.firstname;
  const lastName = form.lastname;
	const email = form.email;


  res.json({
    status: true,
    firstName,
    lastName,
    email,
  });
};
