// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import { a,b,c } from './mymodule.js';
console.log(a,b,c)

import obj from './mymodule.js';
console.log(obj)     //obj is default we can call using any keyword or variable  