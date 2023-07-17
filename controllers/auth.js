const User = require("../models/user");
// const RefreshToken = require("../models/refreshToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../helpers/createAccessToken");
const { createRefreshToken } = require("../helpers/createRefreshToken");
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
      .then((doMatch) => {
        if (doMatch) {
          //TO DO:
          //ADD REFRESH TOKENS TO DATABASE
          // const refreshTokenDoc = new RefreshToken({
          //   owner: user._id,
          // });
      
          const token = createAccessToken(user.id);
          const refreshToken = createRefreshToken(user.id);
          // const refreshTokenDoc = new RefreshToken({
          //   token: refreshToken,
          // });
          // refreshTokenDoc.save();

          return res.status(200).send({  accessToken:token, refreshToken:refreshToken });
        }
        res.status(400).send({ msg: "Wrong password" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ msg: "Error occurred during login" });
      });
  });
};

exports.postNewRefreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    res.status(401).send({ msg: "You are not authenticated!" });
  }
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=> {
    
      if(err) {
        throw new Error(err)
      }
      // RefreshToken.deleteOne({token:refreshToken})
     
      const newAccessToken = createAccessToken(payload._id);
      const newRefreshToken = createRefreshToken(payload._id);
      // const refreshTokenDoc = new RefreshToken({
      //   token: newRefreshToken,
      // });
      // refreshTokenDoc.save();
      return res.status(200).json({ accessToken:newAccessToken, refreshToken:newRefreshToken });
    });

  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Request is not authorized" });
  }
};
