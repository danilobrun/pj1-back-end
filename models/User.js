// IMPORTS
const mongoose = require('mongoose')

// Acesssos e propriedades dessa classe
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
})

// EXPORTS
module.exports = User