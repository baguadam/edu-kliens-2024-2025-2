// Initializes the `puzzles` service on path `/puzzles`
const { Puzzles } = require('./puzzles.class');
const createModel = require('../../models/puzzles.model');
const hooks = require('./puzzles.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/puzzles', new Puzzles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('puzzles');

  service.hooks(hooks);
};
