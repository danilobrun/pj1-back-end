// Models
const User = require('../../../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const listUsers = async (req, res) => {

    const users = await User.find()
    
    res.status(200).json(users)
}
// Private Route - Only Logged Users
const getUserById = async (req, res) => {

    const id = req.params.id

    // Check if user exists
    const user = await User.findById(id, '-password')

    if(!user) {
        res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json({ user })
}

// Register User
const createUser = async(req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // Validations
    if(!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório' })
    }

    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }

    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    if(password !== confirmpassword) {
        return res.status(422).json({ msg: 'A senhas não conferem!' })
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if(userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail.' })
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()

    })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso' })
        
    } catch (error) {
        console.log("error", error)

        res
        .status(500)
        .json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

// Login User - Route
const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Validations
    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }

    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    // Check if user exists
    const user = await User.findOne({ email: email })

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado.' })
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        res.status(422).json({ msg: 'Senha inválida!' })
    }

    try {

        const secret = process.env.SECRET
        console.log(secret);
        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })

    } catch(err) {
        res
        .status(500)
        .json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

module.exports = {
    listUsers,
    getUserById,
    createUser,
    loginUser
}