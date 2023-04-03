const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../expections/InvarianError');
const NotFoundError = require('../../expections/NotFoundError');

class PlaylistSongService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong(playlistId, songId) {
    const id = `playlistsong-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_song VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan lagu ke playlist');
    }
    return result.rows[0].id;
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
            JOIN playlist_song ON songs.id = playlist_song.song_id
            JOIN playlists ON playlist_song.playlist_id = playlists.id
            WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistSong(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_song WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu di playlist gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = PlaylistSongService;
