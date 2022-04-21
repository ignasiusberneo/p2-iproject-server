const { convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = convertTokenToPayload(access_token);
    const data = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!data) {
      throw { name: UNAUTHORIZED };
    } else {
      req.user = {
        id: data.id,
        email: data.email,
      };
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Please login first",
    });
  }
}

module.exports = authentication;
