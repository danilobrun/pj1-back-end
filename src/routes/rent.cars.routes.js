const { checkToken } = require('../middleware/checktoken')
const { rentCar } = require('../presentation/controllers/rents.controller')

const rentsRoutes = (app) => {

    app.post('/rentcar/:id', checkToken, rentCar)
    app.get('/rentscars/:id', checkToken, rentCar)
}


module.exports = rentsRoutes
