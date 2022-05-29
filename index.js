'use strict'
require('./database/database').then(() => {
    const Main = require('./bin/Main')
    Main.start()
}).catch((err) => {
    console.log('erro ao conectar ao banco de dados', err)
});
