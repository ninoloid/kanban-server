const router = require('express').Router()
const { projectController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const { projectAuthorization, projectOwnerAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.post('/', projectController.addProject)
router.get('/', projectController.getProject)
router.post('/addPerson', projectController.addPersonToProject)
router.delete('/deletePerson/:id', projectOwnerAuthorization, projectController.deletePersonFromProject)
router.delete('/:id', projectOwnerAuthorization, projectController.deleteProject)
router.get('/:id', projectController.getUserOnProject)

module.exports = router