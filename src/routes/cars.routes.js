const { home, listCars, privateRoute, authRegister, loginUser } = require("../presentation/controllers/cars.controller")
const { checkToken } = require("../middleware/checktoken")

const carsRoutes = (app) => {

    app.get('/', home);
    app.get('/listcars', listCars);
    app.get('/user/:id', checkToken, privateRoute);
    app.post('/auth/register', authRegister);
    app.post('/auth/login/', loginUser)
}


module.exports = carsRoutes
