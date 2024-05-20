const ApiError = require("../errors/apiError")
const newsService = require("../service/newsService")

class NewsController {
	async getAll(req, res, next) {
		try {
			const { limit } = req.query
			const result = await newsService.getAll(req.user.id, limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new NewsController()
