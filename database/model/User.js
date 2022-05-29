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

const user = new User({
    fullName: 'sdsd',
    email: 'teste',
    address: 'dsdas',
    addressNumber: 1,
    phoneNumber: '23432'
})
console.log('antes de salvar');
user.save()
console.log('depois de salvar');
