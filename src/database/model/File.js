const mongoose = require('mongoose')
console.log(mongoose.connection.readyState === 1 ? 'banco conectado' : 'desconectado');

const fileSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    folderId: {type: String, required: true},
});

mongoose.model('File', fileSchema);
const File = mongoose.model('File')

const saveFile = (payload) => {
    const folder = new File(payload)

    folder.save();
}

const findFile = async (name) => {
    return await File.find({name})
}

module.exports = {
    saveFile,
    findFile
}
