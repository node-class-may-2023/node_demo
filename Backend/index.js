// const { logger } = require('./logger')
// const { isAuthorized } = require('./auth')
// const path = require('path')
const fs = require('fs');
const http = require('http');
const products = require('./mockData.json');

// logger('some message from index.js')
// console.log(isAuthorized())

// fs.readdir('./', (error, files) => {
//   if (error) console.log(error)
//   else console.log(files)
// })

// fs.readFile('./node_demo_file.txt', (err, buf) => {
//   if (err) console.log(error)
//   else console.log(buf.toString())
// })

// fs.writeFile('greetings.txt', '____Hello World from Index.js____', err => {
//   if (err) console.log(err)
//   else console.log('file write successful')
// })

// const pathObj = path.parse(__)

// console.log(pathObj)

// console.log(module)

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
      res.write(`{"errorMessage": "Only GET request are allowed"}`);
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
