const ApiError = require("../errors/apiError")
const postService = require("../service/postService")

class PostController {
	async createPost(req, res, next) {
		try {
			const { text } = req.body
			const files = req.files
			const result = await postService.createPost(
				req.user.id,
				text,
				await files && files.image
			)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getPosts(req, res, next) {
		try {
			const { id, limit = 4 } = req.query
			const result = await postService.getPosts(id, limit)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createComment(req, res, next) {
		try {
			const { message, postId } = req.body
			const result = await postService.createComment(
				message,
				postId,
				req.user.id
			)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteComments(req, res, next) {
		try {
			const { id } = req.params
			const result = await postService.deleteComments(id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addLike(req, res, next) {
		try {
			const { id } = req.body
			const result = await postService.addLike(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deletePost(req, res, next) {
		try {
			const { id } = req.params
			const result = await postService.deletePost(id, req.user.id)
			res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new PostController()
