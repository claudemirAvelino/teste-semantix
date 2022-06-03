'use strict'
const { Worker, isMainThread } = require('worker_threads')

class Work {

    #users
    constructor(users) {
        this.#users = users;
    }

    Make() {
        const final = [];
        let finishedWorkers = 0;
        for (let user of this.#users) {
            const worker = new Worker('./src/worker/work.js')
            worker.once('message', (message) => {
                final.push(message)
                finishedWorkers++
                //if (finishedWorkers === this.#users.length) console.log(final)
            })
            worker.on('error', console.error)

            console.log(`Iniciando worker de ID ${worker.threadId} e enviando o payload "${user} e é a thread principal? ${isMainThread}"`)
            worker.postMessage(user)
        }
    }
}

module.exports = Work;
