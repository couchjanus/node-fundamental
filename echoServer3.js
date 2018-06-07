// Загружаем модуль http
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    let urlParsed = url.parse(req.url, true);
    console.log(urlParsed);

    if (urlParsed.pathname == '/contact') {
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
