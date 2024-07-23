const JWT = require("jsonwebtoken");
const env = require("dotenv").config();

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
  };
  const token = JWT.sign(payload, process.env.secret, {
    expiresIn: "1h",
  });
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, process.env.secret);
  return payload;
}
module.exports = {
  createTokenForUser,
  validateToken,
};
