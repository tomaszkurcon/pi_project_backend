const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res
          .status(400)
          .send({ msg: "User with this email already exists!" });
      }
      if (password !== confirmPassword) {
        return res
          .status(400)
          .send({ msg: "Password doesn't match confirm password" });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
        });
        return user.save().then(() => {
          res.status(201).send({ msg: "User has been created successfully" });
        });
      });
    })
    .catch((err) =>
      res.status(500).send({ msg: "Error occurred during registration" })
    );
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .send({ msg: "User with entered email doesn't exist" });
    }
    bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          const accessToken = jwt.sign({_id:user._id}, process.env.SECRET, {expiresIn: '1d'})
          return res.status(200).send({email, accessToken})
        }
        res.status(400).send({ msg: "Wrong password" });
      })
      .catch((err) => {
        res.status(500).send({ msg: "Error occurred during login" });
      });
  });
};
