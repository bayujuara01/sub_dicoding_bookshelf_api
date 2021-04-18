const { server } = require('@hapi/hapi');
const BookService = require('../../services/BooksServices');
const { isEmpty } = require('../../helper/ValidationHelper');

class BooksHandler {
  /**
   *
   * @param { BookService } service
   */
  constructor(service) {
    this._service = service;

    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBookHandler = this.getBookHandler.bind(this);
    this.putBookHandler = this.putBookHandler.bind(this);
    this.deleteBookHandler = this.deleteBookHandler.bind(this);
  }

  postBookHandler(request, h) {
    try {
      const bookId = this._service.addBook(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId
        }
      });

      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      });

      response.code(400);
      return response;
    }
  }

  getBookHandler(request, h) {
    const { bookId } = request.params;
    const { name, reading, finished } = request.query;

    if (!isEmpty(name) || reading || finished) {
      try {
        const books = this._service.getBookByQuery({ name, reading, finished });
        const response = h.response({
          status: 'success',
          data: {
            books
          }
        });

        response.code(200);
        return response;
      } catch (err) {
        const response = h.response({
          status: 'fail',
          message: err.message
        });

        response.code(404);
        return response;
      }
    }

    if (isEmpty(bookId)) {
      const books = this._service.getBooks();
      const response = h.response({
        status: 'success',
        data: {
          books
        }
      });

      response.code(200);
      return response;
    }

    try {
      const book = this._service.getBookById(bookId);
      const response = h.response({
        status: 'success',
        data: {
          book
        }
      });

      response.code(200);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });

      response.code(404);
      return response;
    }
  }

  putBookHandler(request, h) {
    const { bookId } = request.params;
    const body = request.payload;

    if (isEmpty(body.name)) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      });

      response.code(400);
      return response;
    }

    if (body.readPage > body.pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      });

      response.code(400);
      return response;
    }

    try {
      const book = this._service.updateBook(bookId, body);

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      });

      response.code(200);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });

      response.code(404);
      return response;
    }
  }

  deleteBookHandler(request, h) {
    const { bookId } = request.params;
    try {
      const id = this._service.deleteBook(bookId);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      });

      response.code(200);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });

      response.code(404);
      return response;
    }
  }
}

module.exports = BooksHandler;
