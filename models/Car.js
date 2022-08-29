// IMPORTS
const mongoose = require('mongoose')

// Acesssos e proriedades dessa classe
const Car = mongoose.model('Car', {
    name: String,
    brand: String,
    model: String,
    year: String,
    transmission: String,
    engine: String,
    color: String,
    door: String

})

// EXPORTS
module.exports = Car