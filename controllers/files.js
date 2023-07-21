const Image = require("../models/image");
exports.postUploadFile = async (req, res) => {
    const body = req.body

    try {
        const newImage = await Image.create({base64:body.data, user_id:req.user})
        newImage.save()
        res.status(201).send({msg:"New image has been uploaded!"})
    }
    catch(error) {
        res.status(409).send({msg:error.message})
    }
}

exports.getFile = async (req, res) => {
    const userId = req.user._id
    try {
        const image = await Image.find({user_id:userId})
        res.status(200).send({data:{base64:image[0].base64}})
    }
    catch(error) {
        res.status(404).send({msg:error.message})
    }
}