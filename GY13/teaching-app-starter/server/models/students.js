"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.belongsTo(models.Teachers, {
        foreignKey: "TeacherId",
        as: "teacher",
      });
      Students.hasMany(models.Lessons, {
        foreignKey: "StudentId",
        as: "lessons",
      });
    }
  }
  Students.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be null",
          },
          isInt: {
            msg: "Price must be an integer",
          },
          min: {
            args: [1],
            msg: "Price must be a positive integer",
          },
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Subject cannot be null",
          },
        },
      },
      lessonDates: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Lesson dates cannot be null",
          },
        },
        defaultValue: [],
      },
      TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Teacher ID cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Students",
      hooks: {
        async beforeValidate(student, options) {
          const teacher = await sequelize.models.Teachers.findByPk(
            student.TeacherId
          );

          if (!teacher) {
            throw new Error("Teacher not found!");
          }

          if (!teacher.subjects.includes(student.subject)) {
            throw new Error(
              "Subject must be one of the subjects taught by the teacher!"
            );
          }
        },
      },
    }
  );

  return Students;
};
