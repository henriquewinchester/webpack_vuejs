'use strict';

const path = require('path');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: 3000,
  host: 'localhost'
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file(path.resolve(__dirname, './views/index.html'));
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public/',
        listing: true
      }
    }
  });

});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});
