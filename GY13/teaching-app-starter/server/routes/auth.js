const express = require("express");
const router = express.Router();
const { Teachers } = require("../models");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const {
  handleMissingParamError,
  handleAuthError,
  jwtAuth,
} = require("../middlewares/authentication");
const { loginLimiter } = require("../middlewares/protection");

router.post(
  "/login",
  loginLimiter,
  handleMissingParamError(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const teacher = await Teachers.findOne({ where: { email } });
      if (!teacher) {
        return res.status(400).json({ message: "User cannot be found!" });
      }

      if (teacher.comparePassword(password)) {
        const token = jwt.sign(teacher.toJSON(), "secret-key", {
          algorithm: "HS256",
          expiresIn: "1h",
        });

        res.json({ token });
      } else {
        res.status(400).json({ message: "Login failed!" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.post(
  "/register",
  handleMissingParamError([
    "name",
    "email",
    "password",
    "passwordAgain",
    "subjects",
  ]),
  async (req, res, next) => {
    try {
      const { name, email, password, passwordAgain, subjects } = req.body;

      if (password !== passwordAgain) {
        return res.status(400).json({ message: "Passwords don't match!" });
      }

      if (!Array.isArray(subjects)) {
        return res.status(400).json({ message: "Subjects must be an array!" });
      }

      const existingTeacher = await Teachers.findOne({ where: { email } });
      if (existingTeacher) {
        return res.status(400).json({ message: "Email is already in use!" });
      }

      const teacher = await Teachers.create({
        name,
        email,
        password,
        subjects,
      });

      const token = jwt.sign(teacher.toJSON(), "secret-key", {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.get("/me", jwtAuth, handleAuthError, async (req, res) => {
  res.json(req.auth);
});

module.exports = router;
