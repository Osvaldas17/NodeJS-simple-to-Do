const router = require('express').Router();

const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')
const authentification = require('../middleware/authentification')


router.route('/tasks')
    .post(authentification.authentification, taskController.createTask)
    .get(taskController.getTasks)

router.route('/myTasks')
    .get(authentification.authentification, taskController.getMyTasks)
router.route('/deleteTask')
    .post(authentification.authentification, taskController.deleteTask)

// user
router.route('/task/check')
    .post(taskController.checkTask)
router.route('/user/signUp').post(userController.signUp)
router.route('/user/signIn').post(userController.signIn)
router.route('/user/currentUser').get(authentification.authentification, userController.currentUser)
router.route('/user/logOut').post(authentification.authentification, userController.logOut)


module.exports = router
