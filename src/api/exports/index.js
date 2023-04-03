const ExportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { service, plyalistService, validator }) => {
    const exportsHandler = new ExportsHandler(service, plyalistService, validator);
    server.route(routes(exportsHandler));
  },
};
