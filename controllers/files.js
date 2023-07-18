const Image = require("../models/image");
exports.postUploadFile = async (req, res) => {
    const body = req.body
    try {
        const newImage = await Image.create(body)
        newImage.save()
        res.status(201).send({msg:"New image has been uploaded!"})
    }
    catch(error) {
        res.status(409).send({msg:error.message})
    }
}