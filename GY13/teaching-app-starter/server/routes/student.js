const express = require("express");
const router = express.Router();
const { Students, Teachers, Lessons } = require("../models");
const {
  jwtAuth,
  handleAuthError,
  handleMissingParamError,
} = require("../middlewares/authentication");
const {
  validateAllowedUpdates,
  validateIds,
} = require("../middlewares/validation");
const {
  getStudentAndAuthorize,
  validateStudentData,
} = require("../middlewares/studentMiddleware");

router.get(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateIds(["id"]),
  async (req, res, next) => {
    try {
      const { id: studentId } = req.params;
      const { id: teacherId } = req.auth;

      const searchedStudent = await Students.findOne({
        where: {
          id: studentId,
          TeacherId: teacherId,
        },
      });

      if (!searchedStudent) {
        return res.status(404).json({
          message: "Student not found!",
        });
      }

      return res.json(searchedStudent);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/lessons",
  jwtAuth,
  handleAuthError,
  validateIds(["id"]),
  async (req, res, next) => {
    try {
      const { id: studentId } = req.params;
      const { id: teacherId } = req.auth;

      const studentWithLessons = await Students.findOne({
        where: {
          id: studentId,
          TeacherId: teacherId,
        },
        include: [{ model: Lessons, as: "lessons" }],
      });

      if (!studentWithLessons) {
        return res.status(404).json({ message: "Student not found!" });
      }

      return res.json({
        message: "Student found with lessons",
        lessons: studentWithLessons.lessons,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.get(
  "/:id/lesson/:lessonId",
  jwtAuth,
  handleAuthError,
  validateIds(["id", "lessonId"]),
  async (req, res, next) => {
    try {
      const { id: studentId } = req.params;
      const { lessonId } = req.params;
      const { id: teacherId } = req.auth;

      const lesson = await Lessons.findOne({
        where: {
          id: lessonId,
        },
        include: [
          {
            model: Students,
            as: "student",
            where: {
              id: studentId,
              TeacherId: teacherId,
            },
          },
        ],
      });

      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found!" });
      }

      return res.json({ message: "Lesson found successfully", lesson });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.post(
  "/",
  jwtAuth,
  handleAuthError,
  handleMissingParamError(["name", "price", "subject", "lessonDates"]),
  async (req, res, next) => {
    try {
      const { id: teacherId } = req.auth;
      const { name, price, subject, lessonDates } = req.body;

      const teacher = await Teachers.findByPk(teacherId);
      if (!teacher.subjects.includes(subject)) {
        return res.status(400).json({ message: "Wrong subject" });
      }

      const student = await Students.create({
        name,
        price,
        subject,
        lessonDates,
        TeacherId: teacherId,
      });

      res.json({ message: "Student created successfully", student });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.put(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateIds(["id"]),
  validateAllowedUpdates(["name", "price", "subject", "lessonDates"]),
  validateStudentData,
  getStudentAndAuthorize,
  async (req, res, next) => {
    try {
      const { student } = req;

      await student.update(req.body, {
        fields: ["name", "price", "subject", "lessonDates"],
      });

      res.json({
        message: "Student updated successfully",
        student,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.delete(
  "/:id",
  jwtAuth,
  handleAuthError,
  validateIds(["id"]),
  getStudentAndAuthorize,
  async (req, res, next) => {
    try {
      const { student } = req;

      await student.destroy();

      res.json({ message: "Student deleted successfully!" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
