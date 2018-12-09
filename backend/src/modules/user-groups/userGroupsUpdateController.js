import db from '../../models';

export const userGroupsUpdateController = async (req, res) => {
  const userId = await req.body.userId;
  const groupId = await req.body.groupId;

  const result = db.userGroupBelonging
    .destroy({
      where: {
        userId: userId
      }
    }).then(() => {
      const userGroups = db.userGroupBelonging.create({userId: userId, groupId: groupId})
      .then((response) => {
        console.log(req.body);
      })
    })

      
};
