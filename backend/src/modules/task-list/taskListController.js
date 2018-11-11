import db from '../../models/';

export const taskListController =

  async (req, res) => {
    console.log(req.body.email);
  const data = await req.body;

  const preResult = db.users.findOne({
    where: { email: req.user.email}
    }).then((responseFirst) => {
      console.log(responseFirst);

      const result = db.task_history.findAll({
        where: { idUser: responseFirst.id },
        include: [{
             model: db.tasks,
             include: [{
               model: db.departments
             }]
           }]
         }).then((response) => {
         // response = JSON.stringify(response)
         // response = JSON.parse(response)
         res.json({
           response,
         });
         console.log(response);

       });
     });
  }

/*
  const result = db.task_history.findAll({
    where: { idUser: '9' },
    include: [{
           model: db.tasks,
           include: [{
             model: db.departments
           }]
         }]
  }).then((response) => {

    console.log(response)
    // response = JSON.stringify(response)
		// response = JSON.parse(response)
    res.json({
      response,
    });
  });
}
*/
