// Загружаем модуль http
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {
    console.log(req.headers);
   
    let urlParsed = url.parse(req.url, true);
    
    if (urlParsed.pathname == '/contact') {
        res.statusCode = 200;
        // res.writeHeader(200 "OK", {'Cache-control':'no-cache'});

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-control', 'no-cache');
        res.end( `<h1>Hello World!</h1> <h2>${urlParsed.query.message}</h2>`);
    } else {
        res.statusCode = 404; // Not Found
        res.end("<h1>Page not found</h1>");
    }
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
