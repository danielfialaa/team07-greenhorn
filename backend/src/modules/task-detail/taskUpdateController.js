import db from '../../models/';

export const taskUpdateController = async (req, res) => {

    const id = await req.params.id;
    const filePath = await req.params.filePath;


    var promises = req.body.filePath.map(function(filePath) {
        const file = db.attachments.create({
            path: filePath,
            idAssignedTask: id
        }).then(console.log(idTask, path));
    });
}
