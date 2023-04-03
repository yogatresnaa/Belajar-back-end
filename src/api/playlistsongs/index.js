/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { playlistSongsService, songservice, plyalistService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler({ playlistSongsService, songservice, plyalistService, validator });
    server.route(routes(playlistSongsHandler));
  },
};
