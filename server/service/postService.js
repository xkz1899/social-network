const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const { Post, User, Role, PostComment, PostLike } = require("../models/models")

class PostService {
	async createPost(id, text, image) {
		const imgFolder = path.resolve(__dirname, "..", "static", id + "", "image")
		let imgName = ""
		if (image) {
			const imgType = image.name.split(".").at(-1)
			imgName = uuid.v4() + "." + imgType
		}
		if (!fs.existsSync(imgFolder)) {
			fs.mkdir(path.resolve(imgFolder), err => {
				if (err) throw err
			})
		}
		if (image) {
			image.mv(
				path.resolve(__dirname, "..", "static", id + "", "image", imgName)
			)
		}
		let post
		if (image && text) {
			post = await Post.create({ image: imgName, text, userId: id })
		}
		if (image && !text) {
			post = await Post.create({ image: imgName, userId: id })
		}
		if (text && !image) {
			post = await Post.create({ text, userId: id })
		}
		return await Post.findOne({
			where: { id: post.id },
			include: [
				{
					model: User,
					attributes: ["id", "name", "surname", "image"],
				},
				{
					model: PostComment,
					include: {
						model: User,
						attributes: ["id", "name", "surname", "image"],
					},
				},
			],
		})
	}
	async getPosts(id, limit) {
		return await Post.findAndCountAll({
			where: { userId: id },
			include: [
				{
					model: User,
					attributes: ["id", "name", "surname", "image"],
				},
				{
					model: PostComment,
					order: [["updatedAt", "DESC"]],
					include: {
						model: User,
						attributes: ["id", "name", "surname", "image"],
					},
				},
			],
			order: [["createdAt", "DESC"]],
			distinct: true,
			limit,
		})
	}
	async createComment(message, postId, userId) {
		const comment = await PostComment.create({ message, postId, userId })
		return await PostComment.findOne({
			where: { id: comment.id },
			include: { model: User, attributes: ["id", "name", "surname", "image"] },
		})
	}
	async deleteComments(id) {
		await PostComment.destroy({ where: { id } })
	}
	async addLike(postId, userId) {
		const exist = await PostLike.findOne({ where: { postId, userId } })
		if (exist) {
			await PostLike.destroy({ where: { userId, postId } })
		} else {
			await PostLike.create({ postId, userId })
		}
		const like = await PostLike.count({ where: { postId } })
		await Post.update({ like }, { where: { id: postId } })
		return await Post.findOne({ where: { id: postId } })
	}
	async deletePost(id, userId) {
		const post = await Post.findOne({ where: { id } })
		const user = await User.findOne({
			where: { id: userId },
			include: { model: Role },
		})
		if (
			(post && post.userId === userId) ||
			user?.roles.find(f => f.role === "admin")
		) {
			await PostComment.destroy({ where: { postId: id } })
			await PostLike.destroy({ where: { postId: id } })
			if (post.image) {
				const imagePath = path.resolve(
					__dirname,
					"..",
					"static",
					id + "",
					"image",
					post.image
				)
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath)
				}
			}
			await Post.destroy({ where: { id } })
		}
	}
}

module.exports = new PostService()
