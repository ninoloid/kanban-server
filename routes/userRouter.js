const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/google-auth', userController.googleSignIn)

module.exports = router