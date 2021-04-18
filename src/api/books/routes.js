const BooksHandler = require('./handler');

/**
 * @param handler { BooksHandler }
 */
const routes = (handler) => [
  {
    method: 'GET',
    path: '/books/{bookId?}',
    handler: handler.getBookHandler
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.postBookHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.putBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBookHandler
  }
];

module.exports = routes;
