const ApiError = require("../errors/apiError")
const photoService = require("../service/photoService")

class PhotoController {
	async createPhoto(req, res, next) {
		try {
			const { image } = req.files
			const { description } = req.body
			const result = await photoService.createPhoto(
				req.user.id,
				description,
				image
			)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getPhotos(req, res, next) {
		try {
			const { id, limit = 10, page = 1, sort = "createdAt:DESC" } = req.query
			const offset = page * limit - limit
			const result = await photoService.getPhotos(id, limit, offset, sort)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deletePhoto(req, res, next) {
		try {
			const { id } = req.params
			const result = await photoService.deletePhoto(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createComment(req, res, next) {
		try {
			const { message, photoId } = req.body
			const result = await photoService.createComment(
				message,
				photoId,
				req.user.id
			)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getComments(req, res, next) {
		try {
			const { photoId, limit = 9 } = req.query
			const result = await photoService.getComments(photoId, limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteComment(req, res, next) {
		try {
			const { id } = req.params
			const result = await photoService.deleteComment(id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addLike(req, res, next) {
		try {
			const { id } = req.body
			const result = await photoService.addLike(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async updateAvatar(req, res, next) {
		try {
			const { image } = req.query
			const result = await photoService.updateAvatar(image, req.user)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	
}

module.exports = new PhotoController()
