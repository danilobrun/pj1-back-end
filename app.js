/* IMPORTS */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const carsRoutes = require("./src/routes/cars.routes")

const app = express()

// Config JSON response middleware
app.use(express.json())

carsRoutes(app)

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.zti1m9u.mongodb.net/?retryWrites=true&w=majority`
        )
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))
