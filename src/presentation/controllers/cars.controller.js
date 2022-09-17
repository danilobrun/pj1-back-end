/* IMPORTS */
require("dotenv").config();

const listCars = (req, res) => {
    res.status(200).json({ msg: 'Lista de carros disponíveis' })
}

module.exports = { 
    listCars,
}