function checkToken(req, res, next) {

    //Get token by headers access with array authorization
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token);
    if(!token) {
        res.status(401).json({ msg: 'Acesso negado!' })
        return
    }

    try {

        const secret = process.env.SECRET
        console.log(secret);
        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({ msg: 'Token inválido!' })
    }

}

module.exports = {
    checkToken
}