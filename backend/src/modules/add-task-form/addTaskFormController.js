import db from '../../models/';

export const addTaskFormController =
  async (req, res) => {

    console.log("req: ", req);
    console.log("res: ", res);
  const form = await db.tasks.create(req.body)
    .then((response) => {
      res.json({
        status: true,
        response,
      });
    }).catch( e => {
      console.log('e:', e);
      res.json({
        status: false
      });
    })
  console.log(form);
//  const attachments = await db.attachment.create(req.body.attachments);
};
