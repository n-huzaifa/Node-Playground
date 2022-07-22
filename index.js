const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('emit', (name, id) => {
    console.log('Hello ' + id + '  ' + name)
})

customEmitter.on('emit', () => {
    console.log('Hello 2')
})


customEmitter.emit('emit', 'Hello world', 1001)

