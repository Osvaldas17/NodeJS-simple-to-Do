
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    checked: {
        type: "Number",
        default: 2
    }
}
)


const Task = mongoose.model('Tasks', taskSchema)

module.exports = Task
