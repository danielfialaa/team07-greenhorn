import db from '../../models';

export const taskInfoController = async (req, res) => {
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
    .count({
      where: { idUser: id },
      
    }).then(response => {
      res.json({
        response,
      });
    });

};



export const tbdInfoController = async (req, res) => {
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
    .count({
      where: { idUser: id, status: "TBD" },
      
    }).then(response => {
      res.json({
        response,
      });
    });

};


export const doneInfoController = async (req, res) => {
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
    .count({
      where: { idUser: id, status: "DONE" },
      
    }).then(response => {
      res.json({
        response,
      });
    });

};