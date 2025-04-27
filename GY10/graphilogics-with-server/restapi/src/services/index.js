const users = require('./users/users.service.js');
const puzzles = require('./puzzles/puzzles.service.js');
const solutions = require('./solutions/solutions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(puzzles);
  app.configure(solutions);
};
