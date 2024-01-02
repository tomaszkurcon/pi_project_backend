const Attempt = require("../models/attempt");
const Image = require("../models/image");
const bcrypt = require("bcryptjs");
exports.postAddAttempt = (req, res) => {
  const attempt = new Attempt({
    enteredDigits: req.body.data.enteredDigits,
    mistakes: req.body.data.mistakes,
    time: req.body.data.time,
    user_id: req.user._id,
    email: req.user.email,
  });
  attempt
    .save()
    .then(res.status(201).send({ msg: "Attempt was succesfully saved" }))
    .catch((err) => console.log(err));
};

exports.getAttempts = (req, res) => {
  Attempt.find().then((attempts) => {
    res.status(200).send({ data: attempts });
  });
};

exports.getUserData = async (req, res) => {
  const user = req.user;
  try {
    const profileImage = await Image.findOne({
      user_id: user._id,
      type: "profileImage",
    });
    const backgroundImage = await Image.findOne({
      user_id: user._id,
      type: "backgroundImage",
    });
    userData = {
      email: user.email,
      name: user.name,
      fullname: user.fullname,
      username: user.username,
      profileImage: profileImage?.base64,
      backgroundImage: backgroundImage?.base64,
    };

    res.status(200).send({ data: userData });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.putUserData = async (req, res) => {
  const user = req.user;
  const newUserData = req.body.data;
  try {
    for (const [key, value] of Object.entries(newUserData)) {
      user[key] = value ? value : undefined;
    }
    await user.save();
    res.status(200).send({ msg: "User data has been updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Couldn't update user data" });
  }
};

exports.putUpdatePassword = async (req, res) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body.data;
  const isMatching = await bcrypt.compare(currentPassword, user.password);
  if (!isMatching) {
    return res.status(400).send({ error: "Current password is incorrect" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();
  res.status(200).send({ msg: "Password has been updated successfully" });
};
