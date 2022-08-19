/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../expections/InvarianError');
const NotFoundError = require('../../expections/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const resultAlbum = await this._pool.query(query);

    if (!resultAlbum.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }
    return resultAlbum.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const resultAlbum = await this._pool.query(query);
    if (!resultAlbum.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const album = resultAlbum.rows[0];
    const result = {
      id: album.id,
      name: album.name,
      year: album.year,
    };

    return result;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id ',
      values: [name, year, id],
    };
    const resultAlbum = await this._pool.query(query);
    if (!resultAlbum.rows.length) {
      throw new NotFoundError('Gagal Memperbarui album');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus,id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
