import db from '../../models/';
const jwt = require('jsonwebtoken');


export const taskDetailController = async (req, res) => {

  const id = await req.params.id;

  const result = await db.task_history
    .findOne({
      where: { id: id },
      include: [{
        model: db.tasks,
      }
    ],
    //include
	});

// TEST
const DoneAttachments = await db.attachments.findAll({
  where: { idAssignedTask: result.idTask},
});

//

	const attachments = await db.attachments.findAll({
		where: { idTask: result.idTask},
	});
  const asignee = await db.users.findOne({
      where: { id: result.idUser },
    });
  const reporter = await db.users.findOne({
      where: { id: result.idReporter },
    });
  const requestor = await db.users.findOne({
      where: { id: result.idRequestor },
    });
  const relatedUsers = [asignee, reporter, requestor];


  var isAssignedToSelf;

  const x = jwt.verify(req.get('Authorization'), '2', (err, decoded) => {
    if (err) {

      isAssignedToSelf = false;

    } else {
      const requestingUserId = decoded.id;

      if(asignee.id === requestingUserId) {
        isAssignedToSelf = true;
      } else {
        isAssignedToSelf = false;
      }
    }
  });



	res.json({
		result,
		attachments,
    DoneAttachments,
    relatedUsers,
    isAssignedToSelf
	});
    // .then(response => {
    //   console.log("BE task detail response: ", response);
    //   res.json({
    //     response,
    //   });
    //   console.log(response);
    // });


/*
  const result = db.task_history
    .findAll({
      where: { idUser: id },
      include: [
        {
          model: db.tasks,
          include: [
            {
              model: db.departments,
            },
          ],
        },
      ],
    })
    .then(response => {
      // response = JSON.stringify(response)
      // response = JSON.parse(response)
      res.json({
        response,
      });
      console.log(response);
    });
  */
};
