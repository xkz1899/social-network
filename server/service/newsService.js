const { Op } = require("sequelize")

const {
	User,
	Friend,
	FriendUser,
	Post,
	PostComment,
} = require("../models/models")

class NewsService {
	async getAll(userId, limit) {
		const result = await FriendUser.findAll({
			where: {
				userId,
				// id: { [Op.not]: userId }
			},
			attributes: ["id"],
			include: {
				model: Friend,
				attributes: ["id"],
				include: {
					model: FriendUser,
					attributes: ["id", "approved"],
					include: {
						model: User,
						attributes: ["id"],
						where: { id: { [Op.not]: userId } },
						include: {
							model: Post,
							attributes: [
								"id",
								"text",
								"image",
								"like",
								"userId",
								"createdAt",
								"updatedAt",
							],
							include: [
								{
									model: PostComment,
									include: {
										model: User,
										attributes: ["id", "name", "surname", "image"],
									},
								},
								{ model: User, attributes: ["id", "name", "surname", "image"] },
							],
						},
					},
				},
			},
		})
		const arr = []
		result.forEach(i => {
			arr.push(...i.friend.friend_users[0].user.posts)
		})
		return {
			rows: arr.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit),
			count: arr.length,
		}
	}
}

module.exports = new NewsService()
