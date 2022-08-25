/* eslint-disable linebreak-style */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable linebreak-style */
require('dotenv').config();
const Hapi = require('@hapi/hapi');

const album = require('./api/album');
const AlbumsService = require('./services/postgres/AlbumService');
const AlbumValidator = require('./validator/album');

const song = require('./api/song/');
const SongService = require('./services/postgres/SongServices');
const SongValidator = require('./validator/song');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UserValidator = require('./validator/users');

const init = async () => {
  const albumservice = new AlbumsService();
  const songservice = new SongService();
  const userService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register([
    {
      plugin: album,
      options: {
        service: albumservice,
        validator: AlbumValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songservice,
        validator: SongValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: UserValidator,
      },
    },
  ]);
  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
