const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Session = require('../models/sessionModel')

const authentification = async (req, res, next) => {
    try {
        let token = req.headers['todoauth']
        console.log(token)
        console.log('token',token)
        let decoded = jwt.verify(token, process.env.JWT_PASSWORD)
        console.log('decoded',decoded)

        let session = await Session.findOne({
            sessionToken: token
        })
        console.log('session',session)
        if (!session) throw 'Error'

        let user = await User.findOne({
            _id: decoded.id
        })
        if (!user) throw 'Error'

        req.user = user
        req.sessionToken = session
        next()
    } catch (e) {
        res.status(401).send({
            message: 'You are not authorized',
            e
        })
    }
}

module.exports = {
    authentification
}