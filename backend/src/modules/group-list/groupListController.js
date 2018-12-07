import db from '../../models/';

export const groupListController = async (req, res) => {
  const result = db.groups.findAll().then(response => {
    res.json({
      response,
    });
  });
};
