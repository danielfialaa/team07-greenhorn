import db from '../../models/';

export const addTaskFormController =
  async (req, res) => {

    console.log("req: ", req);
    console.log("res: ", res);
  const form = await db.task.create(req.body);
  console.log
//  const attachments = await db.attachment.create(req.body.attachments);
  console.log(attachments);


  res.json({
    ok: true,
    form,
  });
};
