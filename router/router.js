//
const url = require('url');
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, '/../public');

const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10,
    "Content-Type": "application/json"
};
  
const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};
  
  

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

    let contentType = mime[path.extname(requestPath).slice(1)] || 'text/plain';

    console.log(`Запрошенный contentType: ${contentType}`);
    
    let filePath = '';
    
    if (contentType == 'text/plain'){

    filePath = (requestPath=='/')? path.join(root, requestPath.replace(/\/$/, '/index.html')) : path.join(root, requestPath + '.html');
    } else {
        filePath = path.join(root, requestPath);
    }
    console.log(`Запрошенный file: ${filePath}`);
      
	
    let actions = {
        'GET': (req, res) => {
           
            let contentType = mime[path.extname(filePath).slice(1)] || 'text/plain';

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
