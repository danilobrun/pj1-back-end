const { home, listCars, checkToken } = require("../presentation/controllers/cars.controller")

const carsRoutes = (app) => {

    app.get('/', home);
    app.get('/listcars', listCars);
    app.get('/user/:id', checkToken);
}


module.exports = carsRoutes
