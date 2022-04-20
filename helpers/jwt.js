const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function convertPayloadToToken(payload) {
  return jwt.sign(payload, secret);
}

function convertTokenToPayload(token) {
  return jwt.verify(token, secret);
}

module.exports = { convertPayloadToToken, convertTokenToPayload };
