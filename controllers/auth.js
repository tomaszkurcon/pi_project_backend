const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
