const Router = require("express").Router

const authRouter = require("./authRouter")
const roleRouter = require("./roleRouter")
const userRouter = require("./userRouter")
const postRouter = require("./postRouter")
const photoRouter = require("./photoRouter")
const friendRouter = require("./friendRouter")
const messageRouter = require("./messageRouter")
const newsRouter = require("./newsRouter")

const router = new Router()

router.use(`/auth`, authRouter)
router.use(`/role`, roleRouter)
router.use(`/user`, userRouter)
router.use(`/post`, postRouter)
router.use(`/photo`, photoRouter)
router.use(`/friend`, friendRouter)
router.use(`/message`, messageRouter)
router.use(`/news`, newsRouter)

module.exports = router
