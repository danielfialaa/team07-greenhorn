import db from '../../models/';

export const departmentListController =
  async (req, res) => {

  const result = db.departments.findAll().then((response) => {
		// response = JSON.stringify(response)
		// response = JSON.parse(response)
    res.json({
      response,
    });
  });
}
