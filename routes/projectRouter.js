const router = require('express').Router()
const { projectController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', projectController.addProject)
router.delete('/:id', projectController.deleteProject)

module.exports = router