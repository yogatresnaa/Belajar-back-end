/* eslint-disable object-curly-newline */
class PlaylistSongHnadler {
  constructor({ playlistSongsService, songservice, plyalistService, validator }) {
    this._playlistSongsService = playlistSongsService;
    this._songsService = songservice;
    this._playlistsService = plyalistService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongHandler = this.getPlaylistSongHandler.bind(this);
    this.deletePlaylistSongHandler = this.deletePlaylistSongHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongsPayload(request.payload);
    const { songId } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._songsService.getSongById(songId);
    const SongId = await this._playlistSongsService.addPlaylistSong(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'Playlist lagu berhasil ditambahkan',
      data: {
        SongId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const playlists = await this._playlistsService.getPlaylistById(credentialId, playlistId);
    const songs = await this._playlistSongsService.getSongsByPlaylistId(playlistId);
    playlists.songs = songs;
    const response = h.response({
      status: 'success',
      message: 'berhasil mendapatkan playlist lagu',
      data: {
        playlist: playlists,
      },
    });
    response.code(200);
    return response;
  }

  async deletePlaylistSongHandler(request) {
    this._validator.validatePlaylistSongsPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSong(playlistId, songId);
    return {
      status: 'success',
      message: 'Playlist song berhasil dihapus',
    };
  }
}

module.exports = PlaylistSongHnadler;
