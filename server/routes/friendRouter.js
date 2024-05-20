const Router = require("express").Router
const friendController = require("../controllers/friendController")
const roleMiddleware = require("../middleware/roleMiddleware")

const router = new Router()

router.post(`/`, roleMiddleware([`user`]), friendController.createFriend)
router.get(`/`, roleMiddleware([`user`]), friendController.getFriends)
router.get(`/check`, roleMiddleware([`user`]), friendController.checkFriend)
router.get(
	`/subscriptions`,
	roleMiddleware([`user`]),
	friendController.getSubscriptions
)
router.get(
	`/request`,
	roleMiddleware([`user`]),
	friendController.getRequestFriends
)
router.get(
	`/notification`,
	roleMiddleware([`user`]),
	friendController.getNotification
)
router.patch(
	`/confirm/:id`,
	roleMiddleware([`user`]),
	friendController.confirmFriendship
)

module.exports = router
