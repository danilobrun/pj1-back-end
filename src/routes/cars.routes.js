const { checkToken } = require("../middleware/checktoken");
const { listCars, getCarById, createCar } = require("../presentation/controllers/cars.controller")

const carsRoutes = (app) => {
    
    app.get('/listcars', listCars);
    app.get('/listcars/:id', checkToken, getCarById);
    app.post('/listcars/auth/register', checkToken, createCar);
}


module.exports = carsRoutes
