const carsRoutes = (app) => {

    app.get('/', (req, res) => {
        res.status(200).json({ msg: 'Bem vindo a Rent a Car sua melhor solução em aluguel de carro!' })
    })
}


module.exports = carsRoutes