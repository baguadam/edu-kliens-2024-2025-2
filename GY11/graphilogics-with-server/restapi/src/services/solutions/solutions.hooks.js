const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
const { disallow, discard } = require("feathers-hooks-common");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [setField({ from: "params.user.id", as: "params.query.userId" })],
    get: [setField({ from: "params.user.id", as: "params.query.userId" })],
    create: [setField({ from: "params.user.id", as: "data.userId" })],
    update: [disallow()],
    patch: [
      setField({ from: "params.user.id", as: "params.query.userId" }),
      discard("puzzleId"),
      discard("userId"),
    ],
    remove: [setField({ from: "params.user.id", as: "params.query.userId" })],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
