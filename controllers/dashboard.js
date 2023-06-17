const Attempt = require("../models/attempt");

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
