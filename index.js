//
// const server = require("./server/server1");
// const server = require("./server/server2");
// const server = require("./server/server3");
const server = require("./server/server5");

let info = 'node-static-http-server by Janus Nic\n'
         + 'Examples of HTTP static file serving in Node.js\n'
         + 'See: https://github.com/couchjanus/node-fundamental\n';

server.boot();
console.log(info);
