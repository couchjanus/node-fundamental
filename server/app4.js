//
const http = require('http');
const url = require('url');
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const root = path.join(__dirname, '/../public');

// Создаем web-сервер с обработчиком запросов

const server = http.createServer((req, res) => {
    
    let urlParsed = url.parse(req.url, true);
    
    console.log(`Запрошенный адрес: ${req.url}`);
    let requestPath = req.url.toString().split('?')[0];
    
    console.log(`Запрошенный path: ${requestPath}`);

    let filePath = (requestPath=='/')? path.join(root, requestPath.replace(/\/$/, '/index.html')) : path.join(root, requestPath + '.html');

    console.log(`Запрошенный file: ${filePath}`);

    let actions = {
        'GET': (req, res) => {
          if (filePath.indexOf(root + path.sep) !== 0) {
              response.statusCode = 403;
              response.setHeader('Content-Type', 'text/plain');
              return response.end('Forbidden');
          }
  
            let contentType = 'text/html';
  
            let stream = fs.createReadStream(filePath);
  
            stream.on('open', () => {
                response.setHeader('Content-Type', contentType);
                stream.pipe(response);
            });
            stream.on('error', () => {
                response.setHeader('Content-Type', 'text/plain');
                response.statusCode = 404;
                response.end('Not found');
            });
  
          },
      };

    res.end("Hello World!");
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
