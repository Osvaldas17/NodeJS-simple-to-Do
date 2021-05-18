const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const Session = require('../models/sessionModel')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {

        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        let savedUser = await user.save()
        res.send(savedUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

const signIn = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if (!user) throw {
            message: 'Wrong email or password'
        }
        let passwordMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordMatch) throw {
            message: 'Wrong email or password'
        }

        let token = jwt.sign({
            id: user._id,
            role: 'user'
        }, process.env.JWT_PASSWORD)
        let session = new Session({
            sessionToken: token,
            expires: new Date().setMonth(new Date().getMonth() + 1)
        })
        console.log(session)

        await session.save()

        res.header('todoauth', token).send(user)
        console.log(user)


    } catch (e) {
        res.status(400).send(e)
    }
}

const currentUser = (req, res) => {
    res.send(req.user)
}

const logOut = async (req, res) => {
    try {
        let token = req.sessionToken
        console.log(token)
        await token.remove()
        res.send({
            message: 'Success'
        })
    } catch (e) {
        res.status(400).send({
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    signUp,
    signIn,
    currentUser,
    logOut,
}
