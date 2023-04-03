const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  // {
  //   method: 'POST',
  //   path: '/playlists/{id}/songs',
  //   handler: handler.postSongPlaylistByIdHadler,
  //   options: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
  // {
  //   method: 'GET',
  //   path: '/playlist/{id}/songs',
  //   handler: handler.getSongPlaylistByIdHandler,
  //   options: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
  // {
  //   method: 'DELETE',
  //   path: 'playlist/{id}/songs',
  //   handler: handler.deleteSongByIdHandler,
  //   options: {
  //     auth: 'openmusic_jwt',
  //   },
];

module.exports = routes;
