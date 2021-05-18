const Task = require('../models/taskModel')

const getTasks = async (req, res) => {
    let allTasks = await Task.find().populate('userId')
    res.send(allTasks)
}




const checkTask = async (req, res) => {
    try {
        if (!req.body._id) throw {
            message: 'Provide task id'
        }
        let task = await Task.findOneAndUpdate({
            _id: req.body._id
        },{
            $inc: {
                checked: 1
            }
        }, {
            new: true
        })

        res.send(task)

    } catch (e) {
        res.status(400).send(e)
    }
}


const createTask = async (req, res) => {
    try {

        const task = new Task({
            content: req.body.content,
            userId: req.user._id,
        })

        let savedTask = await task.save()
        res.send(savedTask)

    } catch (e) {
        res.status(400).send(e)
    }
}
const deleteTask= async (req, res) => {
    Task.deleteOne({ _id: req.body._id }, function (err) {
        if (err) throw (err);
    });
    res.send(Task)
}

const getMyTasks = async (req, res) => {
    let tasks = await Task.find({
        userId: req.user._id
    }).populate('userId')
    res.send(tasks)
}


module.exports = {
    getTasks,
    createTask,
    getMyTasks,
    deleteTask,
    checkTask,
}
