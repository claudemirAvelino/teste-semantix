const mongoose = require('mongoose')
console.log(mongoose.connection.readyState === 1 ? 'banco conectado' : 'desconectado');

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    addressNumber: {type: Number, required: true},
    phoneNumber: {type: String, required: true},
});

mongoose.model('User', userSchema);
const User = mongoose.model('User')

const save = (payload) => {
    const user = new User(payload)

    user.save();
}

module.exports = {
    save
};
