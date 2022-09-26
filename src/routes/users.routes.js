
const { checkToken } = require("../middleware/checktoken");
const { getUserById, createUser, loginUser, listUsers } = require("../presentation/controllers/users.controller");

const usersRoutes = (app) => {

    app.get('/users', listUsers);
    app.get('/user/:id', checkToken, getUserById);
    app.post('/auth/register', createUser);
    app.post('/auth/login/', loginUser)
}


module.exports = usersRoutes

