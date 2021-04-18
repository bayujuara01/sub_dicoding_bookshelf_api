class Book {
  constructor({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage || 0;
    this.finished = finished || false;
    this.reading = reading || false;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = updatedAt || this.insertedAt;
  }
}

module.exports = Book;
