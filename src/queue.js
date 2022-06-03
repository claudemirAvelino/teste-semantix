import 'dotenv/config';
import Queue from './app/lib/Queue';

(() => {
    Queue.add('PersistUsers')
})()
Queue.process();
console.log('Queue on...')
