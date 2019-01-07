import db from '../../models';

export const taskInfoController = async (req, res) => {

  const data = await req.body;
  let id = await req.params.id;
  if (id == 'undefined') {
    const preResult = await db.users
      .findOne({
        where: { email: req.user.email },
      })
      .then(response => {
        id = response.id;
      });
  }

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

  const data = await req.body;
  let id = await req.params.id;
  if (id == 'undefined') {
    const preResult = await db.users
      .findOne({
        where: { email: req.user.email },
      })
      .then(response => {
        id = response.id;
      });
  }

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

  const data = await req.body;
  let id = await req.params.id;
  if (id == 'undefined') {
    const preResult = await db.users
      .findOne({
        where: { email: req.user.email },
      })
      .then(response => {
        id = response.id;
      });
  }

  const tasks = await db.task_history
    .count({
      where: { idUser: id, status: "DONE" },
      
    }).then(response => {
      res.json({
        response,
      });
    });

};