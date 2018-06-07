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
	
	if (urlParsed.pathname == '/') {
		let statusCode = 200;
		let headers = {
			'Cache-control':'no-cache',
			'Content-Type' :'text/html',
			'X-Powered-By': 'janus'
		}
		res.writeHead(statusCode, headers);
		let data = "Hello World!";
		let template = `<html><body><h1>${data}</h1></body></html>`;
		res.end(template);
    } else {
        res.statusCode = 404; // Not Found
        res.end("<h1>Page not found</h1>");
    }
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
