import db from '../../models/';

export const taskDetailController = async (req, res) => {
  console.log('received id: ', req.params.id);

  const data = await req.body;
  const id = await req.params.id;

  const result = await db.task_history
    .findOne({
      where: { id: id },
      include: [{
        model: db.tasks,
        // include:[
        //   {
        //   model: db.attachments,
        //   },
        // ],
      },
    ],
	});

	const attachments = await db.attachments.findAll({
		where: { idTask: result.idTask},
	});

	res.json({
		result,
		attachments,
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