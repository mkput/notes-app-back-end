require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const users = require('./api/users');
const NotesValidator = require('./validator/notes');
const NotesServices = require('./services/postgres/NotesServices');
const UserValidator = require('./validator/users');
const UsersServices = require('./services/postgres/UsersServices');

const init = async () => {
  const notesService = new NotesServices();
  const usersServices = new UsersServices();

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
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersServices,
        validator: UserValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
