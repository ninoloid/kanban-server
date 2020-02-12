const router = require('express').Router()
const userRouter = require('./userRouter')
const kanbanRouter = require('./kanbanRouter')
const projectRouter = require('./projectRouter')

router.use('/', userRouter)
router.use('/task', kanbanRouter)
router.use('/project', projectRouter)

module.exports = router