const mongoose = require('mongoose')
console.log(mongoose.connection.readyState === 1 ? 'banco conectado' : 'desconectado');

const folderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
});

mongoose.model('Folder', folderSchema);
const Folder = mongoose.model('Folder')

const save = (payload) => {
    const folder = new Folder(payload)

    folder.save();
}

const find = async (name) => {
    return await Folder.find({name})
}

module.exports = {
    save,
    find
};
