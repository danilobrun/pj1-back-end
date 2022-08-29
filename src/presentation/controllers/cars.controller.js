const carsStatus = ["ativo", "inativo"];
// Models
const User = require('../../../models/User')

const home = (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a Rent a Car sua melhor solução em aluguel de carro!' })
}

const listCars = (req, res) => {
    res.status(200).json({ msg: 'Lista de carros disponíveis' })
}


// Private Route - Only Logged Users
const checkToken = async (req, res) => {

    const id = req.params.id

    // Check if user exists
    const user = await User.findById(id, '-password')

    if(!user) {
        res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json({ user })
}

// function checkToken(req, res, next) {

//     //Get token by headers access with array authorization
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(" ")[1]

//     if(!token) {
//         res.status(401).json({ msg: 'Acesso negado!' })
//     }

//     try {

//         const secret = process.env.SECRET

//         jwt.verify(token, secret)

//         next()

//     } catch(error) {
//         res.status(400).json({ msg: 'Token inválido!' })
//     }

// }

module.exports = {
    home, 
    listCars,
    checkToken
}