// Загружаем модуль http
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {

  
    // Метод запроса
    console.log("Тип запроса: " + req.method);
    
    console.log("User-Agent: " + req.headers["user-agent"]);
  
    // Содержит только URL адрес, который присутствует в фактическом запросе HTTP.
    console.log("Url: " + req.url);

    console.log("Все заголовки");
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
  
  
    res.end('<h1>Hello World!</h1>');
  
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
