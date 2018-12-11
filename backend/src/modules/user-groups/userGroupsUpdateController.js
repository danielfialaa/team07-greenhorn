import db from '../../models';

export const userGroupsUpdateController = async (req, res) => {
  const userId = await req.body.userId;
  const groupId = await req.body.groupId;

  

  const result = db.userGroupBelonging
    .destroy({
      where: {
        userId: userId
      }
    })
    .then(() => {
      const userGroups = db.userGroupBelonging.create({
        userId: userId, 
        groupId: groupId
      })
    })
    .then((response) => {
      console.log(req.body);
    })
    .then(() => {
      const taskInherit = db.taskGroupBelonging.findAll({
        where: {
          groupId: groupId
        }
      })
      .then((data) => {
          data.map((taskInGroup) => {
            const assignTasksFromGroup = db.task_history.findOrCreate({
              idUser: userId,
              idTask: taskInGroup.taskId,
              dateOfAssignment: Date.now(),
              dateOfDeadline: (Date.now() + 12096e5), // adds 14 days
              status: "TBD",
              idRequestor: req.user.id,
              idReporter: req.user.id,
          })
          })
      })
    })
}
