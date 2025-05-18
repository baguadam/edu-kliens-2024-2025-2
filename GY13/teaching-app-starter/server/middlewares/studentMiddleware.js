const { Students } = require("../models");

const validateStudentData = (req, res, next) => {
  const { price, lessonDates } = req.body;
  const acceptableDates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  if (price && (!Number.isInteger(parseInt(price)) || parseInt(price) < 1)) {
    return res
      .status(400)
      .json({ message: "Price must be a positive integer" });
  }

  if (
    lessonDates &&
    (!Array.isArray(lessonDates) ||
      !lessonDates.every((lesson) => acceptableDates.includes(lesson)))
  ) {
    return res
      .status(400)
      .json({ message: "Lesson dates must be a valid array of weekdays!" });
  }

  next();
};

const getStudentAndAuthorize = async (req, res, next) => {
  try {
    const { id: studentId } = req.params;
    const { id: teacherId } = req.auth;

    if (!Number.isInteger(parseInt(studentId)) || parseInt(studentId) < 1) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Students.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.TeacherId !== teacherId) {
      return res
        .status(403)
        .json({ message: "Not authorized to modify this student" });
    }

    req.student = student;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getStudentAndAuthorize,
  validateStudentData,
};
