const Attempt = require("../models/attempt");

exports.postAddAttempt = (req, res) => {
  const attempt = new Attempt({
    enteredDigits: req.body.data.enteredDigits,
    mistakes: req.body.data.mistakes,
    time: req.body.data.time,
  });
  attempt.save();
  res.status(201).send({ msg: "Attempt was succesfully saved" });
};
