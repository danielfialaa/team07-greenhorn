import db from '../../models';

export const downloadTaskFileController = async (req, res) => {

  const data = await db.attachments
      .findById(9, {})
      .then( response => {
        res.json({
        attachmentPath: response.path,
      });
      console.log('jsem v BE downloadTaskFile, response.path: ',response.path);
    });
  };
     //Number(req.params.id
//  console.log('jsem v BE downloadTaskFile, data.path: ',data.path);
//  console.log("BE: id attachmentu: ", data.id);
