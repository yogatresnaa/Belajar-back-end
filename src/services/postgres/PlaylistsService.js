const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvarianError = require('../../expections/InvarianError');
const NotFoundError = require('../../expections/NotFoundError');
const AuthenticationError = require('../../expections/AuthenticationError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist(name, owner) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvarianError('Playlist gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getPlaylist(owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner = $1',
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result;
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WEHER id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditmeukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthenticationError('Anda tidak berhak mengakses resource ini');
    }
  }
}
module.exports = PlaylistsService;
