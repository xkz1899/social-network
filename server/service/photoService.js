const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const { Photo, User, PhotoComment, PhotoLike } = require("../models/models")

class PhotoService {
	async createPhoto(id, description, image) {
		if (id) {
			const imgFolder = path.resolve(
				__dirname,
				"..",
				"static",
				id + "",
				"image"
			)
			let imgName = ""
			if (image) {
				const imgType = image.name.split(".").at(-1)
				imgName = uuid.v4() + "." + imgType
			}
			const pathImg = path.resolve(
				__dirname,
				"..",
				"static",
				id + "",
				"image",
				imgName
			)
			if (!fs.existsSync(imgFolder)) {
				fs.mkdir(path.resolve(imgFolder), err => {
					if (err) throw err
				})
			}
			if (image) image.mv(pathImg)

			if (image && description) {
				const photo = await Photo.create({
					name: imgName,
					description,
					userId: id,
					like: 0,
				})
				return await Photo.findOne({
					where: { id: photo.id },
					include: [
						{
							model: User,
							attributes: ["id", "name", "surname", "image"],
						},
					],
				})
			}
			if (image) {
				const photo = await Photo.create({ name: imgName, userId: id, like: 0 })
				return await Photo.findOne({
					where: { id: photo.id },
					include: [
						{
							model: User,
							attributes: ["id", "name", "surname", "image"],
						},
					],
				})
			}
		}
	}
	async getPhotos(id, limit, offset, sort) {
		const [sortOption, sortOrder] = sort.split(`:`)

		return await Photo.findAndCountAll({
			where: { userId: id },
			include: [
				{
					model: User,
					attributes: ["id", "name", "surname", "image"],
				},
			],
			distinct: true,
			limit,
			offset,
			order: [[sortOption, sortOrder]],
		})
	}
	async deletePhoto(id, userId) {
		const image = await Photo.findOne({ where: { id } })
		if (image && image.userId === userId) {
			await PhotoComment.destroy({ where: { photoId: id } })
			await PhotoLike.destroy({ where: { photoId: id } })
			if (image.name) {
				const imagePath = path.resolve(
					__dirname,
					"..",
					"static",
					id + "",
					"image",
					image.name
				)
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath)
				}
			}
			await Photo.destroy({ where: { id } })
		}
	}
	async createComment(message, photoId, userId) {
		const comment = await PhotoComment.create({ message, photoId, userId })
		return await PhotoComment.findOne({
			where: { id: comment.id },
			include: { model: User, attributes: ["id", "name", "surname", "image"] },
		})
	}
	async getComments(photoId, limit) {
		return await PhotoComment.findAndCountAll({
			where: { photoId },
			include: { model: User, attributes: ["id", "name", "surname", "image"] },
			order: [["createdAt", "DESC"]],
			limit,
		})
	}
	async deleteComment(id) {
		await PhotoComment.destroy({ where: { id } })
	}
	async addLike(photoId, userId) {
		const exist = await PhotoLike.findOne({ where: { photoId, userId } })
		if (exist) {
			await PhotoLike.destroy({ where: { userId, photoId } })
		} else {
			await PhotoLike.create({ photoId, userId })
		}
		const like = await PhotoLike.count({ where: { photoId } })
		await Photo.update({ like }, { where: { id: photoId } })
		return await Photo.findOne({ where: { id: photoId } })
	}
	async updateAvatar(image, user) {
		const exist = await Photo.findOne({
			where: { name: image, userId: user.id },
		})

		if (exist) {
			const selectedAvatar = path.resolve(
				__dirname,
				"..",
				"static",
				user.id + "",
				"image",
				exist.name
			)

			const imgType = exist.name.split(".").at(-1)
			const imgName = uuid.v4() + "." + imgType
			let newAvatar = path.resolve(
				__dirname,
				"..",
				"static",
				user.id + "",
				imgName
			)
			if (!user.image) {
				await User.update({ image: imgName }, { where: { id: user.id } })
			}
			if (user.image) {
				const prevAvatar = path.resolve(
					__dirname,
					"..",
					"static",
					user.id + "",
					user.image
				)
				newAvatar = path.resolve(
					__dirname,
					"..",
					"static",
					user.id + "",
					user.image
				)
				if (fs.existsSync(prevAvatar)) {
					fs.unlinkSync(prevAvatar)
				}
			}
			fs.copyFileSync(selectedAvatar, newAvatar)
			return
		}
		return
	}
}

module.exports = new PhotoService()
