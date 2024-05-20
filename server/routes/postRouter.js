const Router = require("express").Router
const postController = require("../controllers/postController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()


router.post(`/`, roleMiddleware([`user`]), postController.createPost)
router.get(`/`, roleMiddleware([`user`]), postController.getPosts)
router.delete(`/:id`, roleMiddleware([`user`]), postController.deletePost)
router.post(`/comment`, roleMiddleware([`user`]), postController.createComment)
router.delete(`/comment/:id`, roleMiddleware([`user`]), postController.deleteComments)
router.post(`/like`, roleMiddleware([`user`]), postController.addLike)

module.exports = router
