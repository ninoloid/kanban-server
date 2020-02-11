const router = require('express').Router()
const userRouter = require('./userRouter')
const kanbanRouter = require('./kanbanRouter')

router.use('/', userRouter)
router.use('/task', kanbanRouter)

module.exports = router