const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../helpers/createAccessToken");
const { createRefreshToken } = require("../helpers/createRefreshToken");
const sendEmail = require("../utils/sendEmail");

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res
          .status(400)
          .send({ error: "User with this email already exists!" });
      }
      if (password !== confirmPassword) {
        return res
          .status(400)
          .send({ error: "Password doesn't match confirm password" });
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
      res.status(500).send({ error: "Error occurred during registration" })
    );
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .send({ error: "User with entered email doesn't exist" });
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

          return res
            .status(200)
            .send({ accessToken: token, refreshToken: refreshToken });
        }
        res.status(400).send({ error: "Wrong password" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Error occurred during login" });
      });
  });
};

exports.postNewRefreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    res.status(401).send({ error: "You are not authenticated!" });
  }
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          throw new Error(err);
        }
        const newAccessToken = createAccessToken(payload._id);
        const newRefreshToken = createRefreshToken(payload._id);

        return res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Request is not authorized" });
  }
};

exports.postForgotPassowrd = async (req, res) => {
  const email = req.body.data.email;
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      throw new Error("User with entered email doesn't exist");
    }

    const token = await user.createResetPasswordToken();
    await user.save();
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
    const html = `
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
`;

    sendEmail({
      to: email,
      subject: "Reset password",
      html: html,
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).send({ email: email });
};

exports.putResetPassword = async (req, res) => {

  const newPassword = req.body.data.password;
  const confirmPassword = req.body.data.confirmPassword;
  const token = req.query?.token;
 
  try {
    if (newPassword !== confirmPassword) {
      throw new Error("Password doesn't match confirm password");
    }
    if(!token) {
      throw new Error("No token specified");
    }
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });
   
    if (!user) {
      throw new Error("Invalid reset token");
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    console.log(user);
    await user.save();
    return res.status(201).send({ msg: "Password was successfully changed" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
