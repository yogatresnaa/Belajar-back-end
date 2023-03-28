class PlaylistHandler {
  constructor(plyalistService, songservice, validator) {
    this._playlistsService = plyalistService;
    this._validator = validator;
    this._songservice = songservice;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistHandler = this.getPlaylistHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });
    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylist(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylistById(id);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // async postSongPlaylistByIdHadler(request, h) {
  //   const { id: playlistId } = request.params;
  //   const { id: credentialId } = request.auth.credentials;
  //   const { songId } = request.payload;

  //   await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
  //   await this._songservice.addSong()
  // }
}

module.exports = PlaylistHandler;
