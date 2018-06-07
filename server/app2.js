//
const http = require('http');
const url = require('url');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {
	
	console.log(`Запрошенный адрес: ${req.url}`);

    let urlParsed = url.parse(req.url, true);
    
    let action = (req, res, data, status, content, cache, powered) => {
        res.writeHead(status || 200, {
          'Content-Type': content || 'text/html',
          'X-Powered-By': powered || 'janus',
          'Cache-control': cache || 'no-cache',
        });
        
        let template = `<html><body><h1>${data}</h1></body></html>`;
        res.end(template);
    };
    switch (urlParsed.pathname) {
        case '/':
          action(req, res, 'Hello, Home Page!', 200, 'text/html', 'no-cache', 'janus');
          break;
        case '/about':
          action(req, res, 'Hello, About Page!', 200, 'text/html', 'no-cache', 'janus');
        break;
      
        case '/contact':
          action(req, res, 'Hello, Contact Page!', 200, 'text/html', 'no-cache', 'janus');
        break;
        default:
          res.statusCode = 404; // Not Found
          res.end("<h1>Page not found</h1>");
      }
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
