const BooksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.1',
  register: async (server, { service }) => {
    const noteHandler = new BooksHandler(service);
    server.route(routes(noteHandler));
  }
};
