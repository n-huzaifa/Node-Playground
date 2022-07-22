const http = require('http')

const server = http.createServer()

server.on('response', (req, res) => {
    res.end('welcome')
}).listen(9090)
