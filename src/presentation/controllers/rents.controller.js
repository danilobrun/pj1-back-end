const Car = require("../../../models/Car");
const Rent = require("../../../models/Rent");
const mongoose = require('mongoose')


const rentCar = async (req, res) => {

    // Get query params id {car_id} 
    const { id } = req.params
    console.log(id);

    // Validations
    if (!id) {
        return res.status(422).json({ msg: 'Favor informar o id do carro!' })
    }

    // check if car exists
    const carExists = await Car.findOne({ _id: id })

    // check if car were rented
    const carRented = await Rent.findOne({ car_id: id })


    if (carExists && !carRented) {

        const { _id, name, brand, model, year, transmission, engine, color, door, license_plate } = carExists

        // create rent new Model
        const rent = new Rent({
            car_id: _id,
            user_id: req.user_id, // get user_id on token function {checktoken}
            createdAt: new Date(),
            updatedAt: new Date()
        })

        // save into database and send response
        rent.save()
        return res.status(200).send(`O carro selecionado foi 
        ${name} ${brand} ${model} ${license_plate}`)

    } else {
        return res.status(404).json({ msg: 'Carro não encontrado!' })
    }


    // try {
    //     // save into database
    //     await car.save()

    //     res.status(201).json({ msg: 'Carro registrado na base com sucesso!'})

    // } catch (error) {
    //     console.log('error', error);

    //     res
    //     .status(500)
    //     .json({ 
    //         msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
    //     })
    // }
}

const rentsGet = async (req, res) => {
    // Recive id rent with param
    const { id } = req.params

    // Validations
    if(!id) {
        return res.status(422).json({ msg: 'Favor informar o aluguel' })
    }

    //check if rent exists
    const rentExists = await Rent.findOne({ _id: id})

    if (!rentExists) {
        return res.status(422).json({ msg: 'Aluguel não existe' })
    }

    // get rent
    try {
        // aggregate database
        const result= await Rent.aggregate(
            [
                {
                    '$addFields': {
                        '_idCar': {
                            '$toObjectId': '$car_id'
                        },
                        '_idUser': {
                            '$toObjectId': '$user_id'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'cars',
                        'localField': '_idCar',
                        'foreignField': '_id',
                        'as': 'car_selected'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': '_idUser',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                },
                {
                    '$match': {
                        '_id': new mongoose.Types.ObjectId(id)
                    }
                }
            ]
        )
        console.log(result);
        return res.status(200).send(result)
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }
}


module.exports = {
    rentCar,
    rentsGet
}