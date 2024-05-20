const Router = require("express").Router
const userController = require("../controllers/userController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.get(`/`, roleMiddleware([`user`]), userController.getAllUser)
router.patch(`/info`, roleMiddleware([`user`]), userController.editInfo)
router.patch(`/last-seen`, roleMiddleware([`user`]), userController.lastSeenUpdate)
router.patch(`/image`, roleMiddleware([`user`]), userController.editAvatar)
router.patch(`/ban`, roleMiddleware([`admin`]), userController.bannedUser)
router.get(`/search`, roleMiddleware([`admin`]), userController.searchUser)
router.get(`/:id`, roleMiddleware([`user`]), userController.getUser)
router.get(`/search/people`, roleMiddleware([`user`]), userController.searchPeople)

module.exports = router
