const Router = require("express").Router
const photoController = require("../controllers/photoController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware([`user`]), photoController.createPhoto)
router.get(`/`, roleMiddleware([`user`]), photoController.getPhotos)
router.delete(`/:id`, roleMiddleware([`user`]), photoController.deletePhoto)
router.post(`/like`, roleMiddleware([`user`]), photoController.addLike)
router.patch(`/avatar`, roleMiddleware([`user`]), photoController.updateAvatar)

router.post(`/comment`, roleMiddleware([`user`]), photoController.createComment)
router.get(`/comment`, roleMiddleware([`user`]), photoController.getComments)
router.delete(`/comment/:id`, roleMiddleware([`user`]), photoController.deleteComment)

module.exports = router
