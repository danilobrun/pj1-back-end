const { checkToken } = require('../middleware/checktoken')
const { rentCar, rentsGet } = require('../presentation/controllers/rents.controller')

const rentsRoutes = (app) => {

    app.post('/rentcar/:id', checkToken, rentCar)
    app.get('/rentscars/:id', checkToken, rentCar)
    app.get('/rents/:id', checkToken, rentsGet)
}


module.exports = rentsRoutes
