const { User } = require("../models/index");
const secret = process.env.SECRET_KEY;
const { comparePassword } = require("../helpers/bcrypt");
const convertPayloadToToken = require("../helpers/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const response = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: response.id,
        email: response.email,
      });
    } catch (err) {
      console.log(err);
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({
          message: err.errors[0].message,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "USER_PASSWORD_REQUIRED" };
      }
      const data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        throw { name: "INVALID_LOGIN" };
      }
      const status = comparePassword(password, data.password);
      if (!status) {
        throw { name: "INVALID_LOGIN" };
      }
      const access_token = convertPayloadToToken({
        id: data.id,
      });
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      if (err.name === "INVALID_LOGIN") {
        res.status(401).json({
          message: "Invalid Username or Password",
        });
      } else if (err.name === "USER_PASSWORD_REQUIRED") {
        res.status(400).json({
          message: "Username and Password are required",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
}

module.exports = userController;
