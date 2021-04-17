const hapi = require('@hapi/hapi');
const laabr = require('laabr');

const PORT = process.env.PORT ? process.env.PORT : 5000;
const HOST = process.env.HOST ? process.env.HOST : 'localhost';

const server = hapi.server({
  port: PORT,
  host: HOST
});

const logOptions = {
  formats: {
    onPostStart: ':time[utc] :level :message',
    response:
      ':time[iso] :method :remoteAddress :url :status :payload (:responseTime ms)'
  },
  tokens: { start: () => '[start]' },
  indent: 0,
  colored: true
};

server.route([
  {
    method: '*',
    path: '/response',
    handler: () => 'Hello World'
  }
]);

(async () => {
  try {
    await server.register({
      plugin: laabr,
      options: logOptions
    });

    await server.start();
    console.log('Server started successfully');
  } catch (err) {
    console.error(err);
  }
})();

server.log('Hehe');
