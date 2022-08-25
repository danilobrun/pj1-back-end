/* IMPORTS */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express()

// Config JSON response middleware
app.use(express.json())

// Models
const User = require('./models/User')

// Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' })
})

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
        password,
    })
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
