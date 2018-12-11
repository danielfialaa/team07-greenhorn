import db from '../../models';

export const userGroupsController = async (req, res) => {
  const id = await req.params.id;

  const result = db.userGroupBelonging
    .findAll({
        where: {
            userId: id,
        }
    })
    .then(response => {
        console.log(response)
      res.json({
        response,
      });
    });
};
