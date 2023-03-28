/* eslint-disable linebreak-style */
const SongsHandler = require('./handlerSong');
const routes = require('./routesSong');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { songservice, validator }) => {
    const songhandler = new SongsHandler(songservice, validator);
    server.route(routes(songhandler));
  },
};
