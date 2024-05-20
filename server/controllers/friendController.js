const ApiError = require("../errors/apiError")
const friendService = require("../service/friendService")

class FriendController {
	async createFriend(req, res, next) {
		try {
			const { id } = req.body
			const result = await friendService.createFriend(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getFriends(req, res, next) {
		try {
			const { id, limit } = req.query
			const result = await friendService.getFriends(Number(id), limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getSubscriptions(req, res, next) {
		try {
			const { id, limit } = req.query
			const result = await friendService.getSubscriptions(Number(id), limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getRequestFriends(req, res, next) {
		try {
			const { id, limit } = req.query
			const result = await friendService.getRequestFriends(Number(id), limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getNotification(req, res, next) {
		try {
			const result = await friendService.getNotification(req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async confirmFriendship(req, res, next) {
		try {
			const { id } = req.params
			const result = await friendService.confirmFriendship(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async checkFriend(req, res, next) {
		try {
			const { id } = req.query
			const result = await friendService.checkFriend(req.user.id, id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new FriendController()
