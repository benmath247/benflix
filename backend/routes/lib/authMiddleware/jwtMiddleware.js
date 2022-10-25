const jwt = require("jsonwebtoken")

function jwtMiddleWare(req, res, next) {
    try {

        if (req.headers && req.headers.authorization) {
            let notDecodedToken = req.headers.authorization
            let slicedToken = notDecodedToken.slice(7)

            let decodedToken = jwt.verify(
                slicedToken,
                proccess.env.JWT_TOKEN_SECRET_KEY
            )

            res.locals.decodedData = decodedToken;
            next()
        }
        else {
            throw {
                message: "You aren't authorized"
            }
        }

    } catch (e) {
        res.status(500).json({ message: "error", payload: e / message })
    }
}

module.exports = jwtMiddleWare