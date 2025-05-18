"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lessons.belongsTo(models.Teachers, {
        foreignKey: "TeacherId",
        as: "teacher",
      });
      Lessons.belongsTo(models.Students, {
        foreignKey: "StudentId",
        as: "student",
      });
    }
  }
  Lessons.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date cannot be null",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("PENDING", "HELD", "MISSED"),
        allowNull: false,
        defaultValue: "PENDING",
        validate: {
          notNull: {
            msg: "Date cannot be null",
          },
        },
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: "Paid cannot be null",
          },
        },
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
      StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Student ID cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Lessons",
    }
  );
  return Lessons;
};
