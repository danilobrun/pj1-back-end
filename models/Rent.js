// IMPORTS
const mongoose = require('mongoose')

// Acesssos e proriedades dessa classe
const Rent = mongoose.model('Rent', {
    name: String,
    brand: String,
    model: String,
    year: Number,
    transmission: String,
    engine: String,
    color: String,
    door: String,
    createdAt: Date,
    updatedAt: Date
})

// EXPORTS
module.exports = Rent