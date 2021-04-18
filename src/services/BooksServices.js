const { nanoid } = require('nanoid');
const Book = require('../models/Book_model');
const { isEmpty, isUndefined } = require('../helper/ValidationHelper');

class BookService {
  constructor() {
    this._books = [];
  }

  addBook({ name, year, author, summary, publisher, pageCount, readPage, reading, finished }) {
    const id = nanoid(16);

    const newBook = new Book({
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished
    });

    if (isEmpty(name)) {
      throw new Error('Gagal menambahkan buku. Mohon isi nama buku');
    }

    if (readPage > pageCount) {
      throw new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    }

    this._books.push(newBook);

    const isSuccess = this._books.filter((book) => book.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getBooks() {
    return this._books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }));
  }

  getBookById(id) {
    const book = this._books.filter((item) => item.id === id);

    if (book.length < 1) {
      throw new Error('Buku tidak ditemukan');
    }

    return book[0];
  }

  getBookByQuery({ name, reading, finished }) {
    let books = [];

    if (!isUndefined(reading)) {
      if (reading > 1) {
        books = this._books;
      } else if (reading) {
        books = this._books.filter((book) => book.reading === true);
      } else {
        books = this._books.filter((book) => book.reading === false);
      }
    }

    if (!isUndefined(finished)) {
      if (finished > 1) {
        books = this._books;
      } else if (finished == 1) {
        books = this._books.filter((book) => book.finished === true);
      } else {
        books = this._books.filter((book) => book.finished === false);
      }
    }
    if (isUndefined(reading) && isUndefined(finished)) books = this._books;

    if (!isEmpty(name)) {
      books = books.filter((item) => item.name.match(new RegExp(`\\b${name}\\b`, 'i')) !== null);

      if (books.length < 1) {
        throw new Error('Buku tidak ditemukan he');
      }
    }

    return books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }));
  }

  updateBook(id, { name, year, author, summary, publisher, pageCount, readPage, reading }) {
    const index = this._books.findIndex((book) => book.id === id);

    if (index < 0) {
      throw new Error('Gagal memperbarui buku. Id tidak ditemukan');
    }

    this._books[index] = {
      ...this._books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    };

    return this._books[index];
  }

  deleteBook(id) {
    const index = this._books.findIndex((book) => book.id === id);

    if (index < 0) {
      throw new Error('Buku gagal dihapus. Id tidak ditemukan');
    }

    const bookId = this._books[index].id;

    this._books.splice(index, 1);

    return bookId;
  }
}

module.exports = BookService;
