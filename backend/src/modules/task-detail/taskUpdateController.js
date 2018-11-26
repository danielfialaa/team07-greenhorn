import db from '../../models/';

export const taskUpdateController = async (req, res) => {

    const id = await req.params.id;
    const filePath = await req.params.filePath;

    console.log("FILE PATH SOUBORU UUUUUUUU:" + filePath);

    var promises = req.body.filePath.map(function(filePath) {
        console.log("FilePath: ",filePath);
        const file = db.attachments.create({
            path: filePath,
            idTask: id,
        }).then(console.log(idTask, path));
    });
}