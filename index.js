const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('emit', () => {
    console.log('nigga')
})

customEmitter.emit('emit')


