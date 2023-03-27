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

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/tokenManager');
const AuthenticationsValidator = require('./validator/Authentications');

const init = async () => {
  const albumservice = new AlbumsService();
  const songservice = new SongService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
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
        service: usersService,
        validator: UserValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);
  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
