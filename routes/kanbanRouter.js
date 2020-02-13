const router = require('express').Router()
const { taskController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const { taskAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.post('/', taskController.addTask)
router.post('/getTask', taskController.showAll)
router.get('/:id', taskController.showOne)
router.put('/:id', taskAuthorization, taskController.updateTask)
router.patch('/:id', taskAuthorization, taskController.updateCategory)
router.delete('/:id', taskAuthorization, taskController.deleteTask)

module.exports = router