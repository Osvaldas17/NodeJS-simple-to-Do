const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}
)

userSchema.pre('save', function(next) {

    let user = this

    if (user.isModified('password')) {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
        next()
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User