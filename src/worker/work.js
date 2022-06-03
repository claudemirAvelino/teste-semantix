const { parentPort } = require('worker_threads')
const mongoose = require('mongoose');

parentPort.once('message', (user) => {
    console.log('message:', user)
    require('../database/database').then(() => {
        const { save } = require('../database/model/User')
        try {
            save(user)
        }catch (e) {
            console.log('save user', e.message)
        }

    }).catch((err) => {
        console.log('erro ao conectar ao banco de dados', err)
    });

    parentPort.postMessage({payload: user})
})
