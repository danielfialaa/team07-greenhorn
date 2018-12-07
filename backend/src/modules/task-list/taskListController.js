import db from '../../models/';

export const taskListController = async (req, res) => {
  console.log('received id: ', req.params.id);

  const data = await req.body;
  let id = await req.params.id;
  console.log(typeof id);
  if (id == 'undefined') {
    const preResult = await db.users
      .findOne({
        where: { email: req.user.email },
      })
      .then(response => {
        console.log('preResult: ', response.id);
        id = response.id;
      });
  }
  console.log('id:', id);

  //
  // .then((responseFirst) => {
  //   console.log(responseFirst);
  //
  const tasks = await db.task_history
    .findAll({
      where: { idUser: id },
      include: [
        {
          model: db.tasks,
          include: [
            {
              model: db.departments,
            }
      ]}],
    }).then(response => {
      res.json({
        response,
      });
    });

};

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
