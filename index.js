const fs = require('fs');
const http = require('http');
const products = require('./mockData.json');
const _ = require('underscore');

console.log(_.flatten([1, [2], [3, [[4]]]]));

const localServer = (req, res) => {
  if (req.url === '/') {
    fs.readFile('./public/index.html', (err, buf) => {
      if (err) console.log(error);
      else {
        res.write(buf.toString());
        res.end();
      }
    });
  }

  if (req.url === '/api/products') {
    if (req.method.toLowerCase() !== 'get') {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('X-Foo', 'bar');
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end();
      return;
    }
    res.write(JSON.stringify(products));
    res.end();
  }

  if (req.url === '/longwait') {
    // for (let i = 0; i < 1000_000_000_000; i++) {}
    res.write('');
    res.end();
    return;
  }

  if (req.url === '/style.css') {
    fs.readFile('./public/style.css', (err, buf) => {
      if (err) console.log(error);
      else {
        res.write(buf.toString());
        res.end();
      }
    });
  }

  if (req.url === '/script.js') {
    fs.readFile('./public/script.js', (err, buf) => {
      if (err) console.log(error);
      else {
        res.write(buf.toString());
        res.end();
      }
    });
  }
};

const server = http.createServer(localServer);
server.on('connection', socket => {
  console.log('new connection');
});

server.listen(3000);
console.log('server started on port 3000');
