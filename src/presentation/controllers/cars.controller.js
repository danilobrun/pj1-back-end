const Car = require("../../../models/Car");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* IMPORTS */
require("dotenv").config();

const listCars = (req, res) => {
    res.status(200).json({ msg: 'Lista de carros disponíveis' })
}

// Private Route - Only Logged Users
const getCarById = async (req, res) => {

    const id = req.params.id

    // Check if car exists
    const car = await Car.findById(id, '-password')

    if(!car) {
        res.status(404).json({ msg: 'Carro não encontrado!'})
    }

    res.status(200).json({ car })
}

// Resgiter Car
const createCar = async (req, res) => {
    const { name, brand, model, year, transmission, engine, color, door, license_plate } = req.body

    // Validations
    if(!name) {
        return res.status(422).json({ msg: 'Favor informar o nome do carro!'})
    }
    if(!brand) {
        return res.status(422).json({ msg: 'Favor informar a marca do carro!'})
    }
    if(!model) {
        return res.status(422).json({ msg: 'Favor informar o modelo do carro!'})
    }
    if(!year) {
        return res.status(422).json({ msg: 'Favor informar o ano do carro!'})
    }
    if(!transmission) {
        return res.status(422).json({ msg: 'Favor informar o tipo de transmissão do carro!'})
    }
    if(!engine) {
        return res.status(422).json({ msg: 'Favor infomar a potência do motor do carro!'})
    }
    if(!color) {
        return res.status(422).json({ msg: 'Favor informar a cor do carro!'})
    }
    if(!door) {
        return res.status(422).json({ msg: 'Favor informar quantas portas possui o carro!'})
    }
    if(!license_plate) {
        return res.status(422).json({ msg: 'Favor informar a placa do carro!'})
    }

    // check if car exists
    const carExists = await Car.findOne({ license_plate: license_plate })

    if (carExists) {
        return res.status(422).json({ msg: 'Carro já cadastrado, favor cadastrar um novo carro.'})
    }

    // create car
    const car = new Car({
        name,
        brand,
        model,
        year,
        transmission,
        engine,
        color,
        door,
        license_plate,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    try {

        await car.save()

        res.status(201).json({ msg: 'Carro registrado na base com sucesso!'})
    } catch (error) {
        console.log('error', error);

        res
        .status(500)
        .json({ 
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

module.exports = { 
    listCars,
    getCarById,
    createCar
}