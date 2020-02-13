const router = require('express').Router()
const { projectController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const { projectAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.post('/', projectController.addProject)
router.get('/', projectController.getProject)
router.delete('/:id', projectAuthorization, projectController.deleteProject)

module.exports = router