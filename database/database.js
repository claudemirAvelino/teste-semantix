const mongoose = require('mongoose');
const server = process.env.SERVER;
const password = process.env.DATABASEPASSWORD

module.exports = mongoose.connect('mongodb+srv://semantix:987654321@semantix.xjxzxuh.mongodb.net/semantix?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório";
