const server = require('static-server')

var Server = new server({
  rootPath: './dist',
  port:     '3000'
})

Server.start(function () {
  console.log(`Server Running on port ${Server.port}`)
})