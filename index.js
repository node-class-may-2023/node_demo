const { logger } = require('./logger')
const { isAuthorized } = require('./auth')
const fs = require('fs')
const path = require('path')
const http = require('http')

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
      if (err) console.log(error)
      else {
        res.write(buf.toString())
        res.end()
      }
    })
  }

  if (req.url === '/api/books') {
    res.write(JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]))
    res.end()
  }

  if (req.url === '/style.css') {
    fs.readFile('./public/style.css', (err, buf) => {
      if (err) console.log(error)
      else {
        res.write(buf.toString())
        res.end()
      }
    })
  }

  if (req.url === '/script.js') {
    fs.readFile('./public/script.js', (err, buf) => {
      if (err) console.log(error)
      else {
        res.write(buf.toString())
        res.end()
      }
    })
  }
}

const server = http.createServer(localServer)
server.on('connection', socket => {
  console.log('new connection')
})

server.listen(3000)
console.log('server started on port 3000')
