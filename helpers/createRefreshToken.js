const jwt = require("jsonwebtoken");
exports.createRefreshToken= (userId) => {
    return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    
}

