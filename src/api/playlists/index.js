const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, { plyalistService, validator }) => {
    const playlistsHnadle = new PlaylistHandler(plyalistService, validator);
    server.route(routes(playlistsHnadle));
  },
};
