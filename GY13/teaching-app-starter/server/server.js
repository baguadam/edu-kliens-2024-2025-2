const { jwtAuth, handleAuthError } = require("./middlewares/authentication");
const { Teachers, Students } = require("./models");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/student", require("./routes/student"));
app.use("/teacher", require("./routes/teacher"));
app.use("/auth", require("./routes/auth"));

// basic routes
app.get("/students", jwtAuth, handleAuthError, async (req, res, next) => {
  try {
    const { id } = req.auth;

    const currentUserWithStudents = await Teachers.findOne({
      where: {
        id,
      },
      include: [{ model: Students, as: "students" }],
    });

    if (!currentUserWithStudents) {
      return res.status(404).json({ message: "Teacher could not be found!" });
    }

    res.json(currentUserWithStudents.students);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Vertical middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

// Listening on port 3000
app.listen(3030, async () => {
  console.log("Cors enabled server is running on port 3000");
  try {
    await require("./models").sequelize.authenticate();
    console.log("Database connected!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
