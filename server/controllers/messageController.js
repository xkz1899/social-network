const ApiError = require("../errors/apiError")
const messageService = require("../service/messageService")

class MessageController {
	async sendMessage(req, res, next) {
		try {
			const { chatId, message } = req.body
			const result = await messageService.sendMessage(
				chatId,
				req.user.id,
				message
			)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createChat(req, res, next) {
		try {
			const { id } = req.body
			const result = await messageService.createChat(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteChat(req, res, next) {
		try {
			const { id } = req.params
			await messageService.deleteChat(id)
			res.json("Chat destroy.")
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getChats(req, res, next) {
		try {
			const result = await messageService.getChats(req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getChat(req, res, next) {
		try {
			const result = await messageService.getChat(req.params.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async searchChat(req, res, next) {
		try {
			const result = await messageService.searchChat(req.body.search)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async checkChat(req, res, next) {
		try {
			const { id } = req.query
			const response = await messageService.checkChat(id, req.user.id)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
	async readMessage(req, res, next) {
		try {
			const { id } = req.params
			const response = await messageService.readMessage(id, req.user.id)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new MessageController()
