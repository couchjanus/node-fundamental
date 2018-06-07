//
const url = require('url');
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, '/../public');

let respond = (res, data, status, headers) => {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

let send404 = (res) => {
  respond(res, 'Not Found', 404, {'Content-Type': 'text/plain'});
};

exports.Router = (req, res) => {
    
    let urlParsed = url.parse(req.url, true);
    let requestPath = req.url.toString().split('?')[0];
    let filePath = (requestPath=='/')? path.join(root, requestPath.replace(/\/$/, '/index.html')) : path.join(root, requestPath + '.html');

	console.log(`Запрошенный file: ${filePath}`);
	
    let actions = {
        'GET': (req, res) => {
            let contentType = 'text/html';
            let stream = fs.createReadStream(filePath);
  
            stream.on('open', () => {
                res.setHeader('Content-Type', contentType);
                res.setHeader('X-Powered-By', 'janus');
                res.setHeader('Cache-control', 'no-cache');
                stream.pipe(res);
            });
            stream.on('error', () => {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 500;
                res.end('Not Found');
            });
        },
    };
    
    let action = actions[req.method];
    action ? action(req, res) : send404(res)(res);
};
