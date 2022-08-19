/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../expections/InvarianError');
const NotFoundError = require('../../expections/NotFoundError');
const { mapDBToModel } = require('../../utils/index');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4,  $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };
    const resultSong = await this._pool.query(query);

    if (!resultSong.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }
    return resultSong.rows[0].id;
  }

  async getSong() {
    const resultSong = await this._pool.query('SELECT id, title, performer, FROM songs');
    return resultSong.rows.map(mapDBToModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const resultSong = await this._pool.query(query);
    if (!resultSong.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return resultSong.rows.map(mapDBToModel)[0];
  }

  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, albumId = $6 WHERE id = $7 RETURNING id ',
      values: [title, year, genre, performer, duration, albumId, id],
    };
    const resultAlbum = await this._pool.query(query);
    if (!resultAlbum.rows.length) {
      throw new NotFoundError('Gagal Memperbarui song');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song gagal dihapus,id tidak ditemukan');
    }
  }
}

module.exports = SongService;