const router = require('express').Router()
const { taskController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', taskController.addTask)
router.get('/', taskController.showAll)
router.get('/:id', taskController.showOne)
router.put('/:id', authorization, taskController.updateTask)
router.patch('/:id', authorization, taskController.updateCategory)
router.delete('/:id', authorization, taskController.deleteTask)

module.exports = router