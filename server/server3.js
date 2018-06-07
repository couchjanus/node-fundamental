//
const http = require('http');
let router = require('./router3');

const hostname = '127.0.0.1';
const port = 3000;

// Создаем web-сервер с обработчиком запросов
// server3.js
const server = http.createServer();

server.on('request', router.Router);

// Запускаем web-сервер

const boot = () => {
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  };

if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module');
    exports.boot = boot;
}
