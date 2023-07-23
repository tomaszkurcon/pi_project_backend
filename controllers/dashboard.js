const Attempt = require("../models/attempt");
const Image = require("../models/image");
exports.postAddAttempt = (req, res) => {
  const attempt = new Attempt({
    enteredDigits: req.body.data.enteredDigits,
    mistakes: req.body.data.mistakes,
    time: req.body.data.time,
    user_id: req.user._id,
    email:req.user.email
  });
  attempt
    .save()
    .then(res.status(201).send({ msg: "Attempt was succesfully saved" }))
    .catch((err) => console.log(err));
};

exports.getAttempts = (req, res) => {

  Attempt.find().then((attempts) => {
    res.status(200).send({ data:attempts});
  });
};

exports.getUserData = async (req,res) => {
  const user = req.user
  try {
    const profileImage = await Image.findOne({user_id:user._id, type:"profileImage"})
    const backgroundImage = await Image.findOne({user_id:user._id, type:"backgroundImage"})
    userData = {
      email:user.email,
      name:user.name,
      surname:user.surname,
      username:user.username,
      profileImage:profileImage?.base64,
      backgroundImage:backgroundImage?.base64
    }

    res.status(200).send({data:userData})
  }
  catch(error) {
    res.status(500).send({msg:error.message})
  }



}
