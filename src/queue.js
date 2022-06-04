require('dotenv/config');
const Queue = require('./app/lib/Queue');

(() => {
    Queue.add('PersistUsers')
})()
Queue.process();
console.log('Queue on...')
