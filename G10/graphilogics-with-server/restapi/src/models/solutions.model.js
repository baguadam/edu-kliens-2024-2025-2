// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const solutions = sequelizeClient.define(
    "solutions",
    {
      solved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      table: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
      indexes: [
        {
          unique: true,
          fields: ["userId", "puzzleId"],
        },
      ],
    }
  );

  // eslint-disable-next-line no-unused-vars
  solutions.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    const { users, puzzles } = models;
    solutions.belongsTo(users);
    solutions.belongsTo(puzzles);
  };

  return solutions;
};
