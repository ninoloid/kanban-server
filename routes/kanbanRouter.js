const router = require('express').Router()
const { taskController } = require('../controllers')

router.post('/', taskController.addTask)
router.get('/', taskController.showAll)
router.get('/:id', taskController.showOne)
router.put('/:id', taskController.updateTask)
router.patch('/:id', taskController.updateCategory)
router.delete('/:id', taskController.deleteTask)

module.exports = router