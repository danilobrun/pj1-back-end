/* IMPORTS */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const carsRoutes = require("./src/routes/cars.routes")

const app = express()

// Config JSON response middleware
app.use(express.json())

// Models
const User = require('./models/User')

carsRoutes(app)

// Private Route - Only Logged Users
app.get('/user/:id', checkToken, async (req, res) => {

    const id = req.params.id

    // Check if user exists
    const user = await User.findById(id, '-password')

    if(!user) {
        res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {

    //Get token by headers access with array authorization
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({ msg: 'Token inválido!' })
    }

}
// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Register User
app.post('/auth/register', async(req, res) => {
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
    })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso' })
        
    } catch (error) {
        console.log(error)

        res
        .status(500)
        .json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
})

// Login User - Route
app.post("/auth/login/", async (req, res) => {
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
})

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.zti1m9u.mongodb.net/?retryWrites=true&w=majority`
        )
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))
