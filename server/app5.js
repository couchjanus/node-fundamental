//
const http = require('http');
const url = require('url');
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const root = path.join(__dirname, '/../public');

// app5.js
const server = http.createServer((req, res) => {
    
    let urlParsed = url.parse(req.url, true);
    let requestPath = req.url.toString().split('?')[0];
    let filePath = (requestPath=='/')? path.join(root, requestPath.replace(/\/$/, '/index.html')) : path.join(root, requestPath + '.html');

	console.log(`Запрошенный file: ${filePath}`);

	let contentType = 'text/html';
 
	let stream = fs.createReadStream(filePath);

	stream.on('open', () => {
		res.setHeader('Content-Type', contentType);
		stream.pipe(res);
	});

	stream.on('error', () => {
		res.setHeader('Content-Type', 'text/plain');
		res.statusCode = 404;
		res.end('Not found');
	});
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
