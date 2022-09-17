const { listCars } = require("../presentation/controllers/cars.controller")

const carsRoutes = (app) => {
    
    app.get('/listcars', listCars);
}


module.exports = carsRoutes
