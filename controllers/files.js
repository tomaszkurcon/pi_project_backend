const Image = require("../models/image");
exports.putUploadFile = async (req, res) => {
    const body = req.body
    try {
        const uploadedImage = await Image.findOneAndUpdate({user_id:req.user, type:body.data.type},{base64:body.data.base64, user_id:req.user, type:body.data.type})
        if(uploadedImage) {
            res.status(201).send({msg:"New image has been uploaded!"})
        }
       else {
        const newImage = await Image.create({base64:body.data.base64, user_id:req.user, type:body.data.type})
        newImage.save()
        res.status(200).send({msg:"New image has been created!"})
       }
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

exports.deleteFile = async (req, res) => {
    const body = req.body
    try {
        const response = await Image.findOneAndDelete({user_id:req.user, type:body.data.type})
        res.status(200).send({msg:"Image has been deleted successfully"})
    }
    catch(error) {
        res.status(404).send({msg:error.message})
    }
}