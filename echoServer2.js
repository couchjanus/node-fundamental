// Загружаем модуль http
const http = require('http');
const querystring = require('querystring');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {

    // Метод запроса
	console.log("Тип запроса: " + req.method);
  
    // Содержит только URL адрес, который присутствует в фактическом запросе HTTP.
    console.log("Url: " + req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World!</h1>');
    
    let urlParsed = url.parse(req.url);
    
    let query = querystring.parse(urlParsed.query);
    console.log(query);
  
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
