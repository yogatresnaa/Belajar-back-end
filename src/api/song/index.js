/* eslint-disable linebreak-style */
const SongsHandler = require('./handlerSong');
const routes = require('./routesSong');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songhandler = new SongsHandler(service, validator);
    server.route(routes(songhandler));
  },
};
