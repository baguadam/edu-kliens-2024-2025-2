// Initializes the `solutions` service on path `/solutions`
const { Solutions } = require('./solutions.class');
const createModel = require('../../models/solutions.model');
const hooks = require('./solutions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/solutions', new Solutions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('solutions');

  service.hooks(hooks);
};
