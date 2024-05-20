const newsController = require("../controllers/newsController")
const Router = require("express").Router
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, newsController.getAll)

module.exports = router
