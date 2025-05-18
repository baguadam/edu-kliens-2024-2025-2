"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teachers.hasMany(models.Students, {
        foreignKey: "TeacherId",
        as: "students",
      });
      Teachers.hasMany(models.Lessons, {
        foreignKey: "TeacherId",
        as: "lessons",
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }

    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  Teachers.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: {
            msg: "Email cannot be null",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be null",
          },
        },
      },
      subjects: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        validate: {
          notNull: {
            msg: "Subject cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Teachers",
      hooks: {
        beforeCreate: async (teacher, options) => {
          const salt = await bcrypt.genSalt(10);
          teacher.password = await bcrypt.hash(teacher.password, salt);
        },
        beforeUpdate: async (teacher, options) => {
          if (teacher.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            teacher.password = await bcrypt.hash(teacher.password, salt);
          }
        },
      },
    }
  );
  return Teachers;
};
