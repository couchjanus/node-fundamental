//
const http = require('http');
const url = require('url');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

// Создаем web-сервер с обработчиком запросов
const server = http.createServer((req, res) => {
	console.log(`Запрошенный адрес: ${req.url}`);
    
    if(req.url.startsWith("/public/")){
		
		// получаем путь после слеша
		let filePath = req.url.substr(1);
		fs.readFile(filePath, (error, data) => {
				
			if(error){
			    res.statusCode = 404; // Not Found
                res.end("Page not found!");
			}	
			else{
				res.end(data);
			}
			return;
		})
	}
	else{
		// во всех остальных случаях отправляем строку hello world!
		res.end("Hello World!");
	}
});

// Запускаем web-сервер
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
