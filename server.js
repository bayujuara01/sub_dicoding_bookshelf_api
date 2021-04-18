const hapi = require('@hapi/hapi');
const laabr = require('laabr');

const PORT = process.env.PORT ? process.env.PORT : 5000;
const HOST = process.env.HOST ? process.env.HOST : 'localhost';

const BooksService = require('./src/services/BooksServices');
const books = require('./src/api/books');

const server = hapi.server({
  port: PORT,
  host: HOST,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});

const logOptions = {
  formats: {
    onPostStart: `:time[utc] :level :message at ${server.info.uri}`,
    response: ':time[iso] :method :remoteAddress :url :status :payload (:responseTime ms)'
  },
  tokens: { start: () => '[start]' },
  indent: 0,
  colored: true
};

(async () => {
  const booksService = new BooksService();
  try {
    if (process.env.NODE_ENV !== 'production') {
      await server.register({
        plugin: laabr,
        options: logOptions
      });
    }

    await server.register({
      plugin: books,
      options: {
        service: booksService
      }
    });

    await server.start();
    console.log(`Server started successfully at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
  }
})();

server.log('Hehe');
