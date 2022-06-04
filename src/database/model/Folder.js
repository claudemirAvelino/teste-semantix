const mongoose = require('mongoose')
console.log(mongoose.connection.readyState === 1 ? 'banco conectado' : 'desconectado');

const folderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
});

mongoose.model('Folder', folderSchema);
const Folder = mongoose.model('Folder')

const saveFolder = (payload) => {
    const folder = new Folder(payload)

    folder.save();
}

const findFolder = async (name) => {
    return await Folder.find({name})
}

module.exports = {
    saveFolder,
    findFolder
}
