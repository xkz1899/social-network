const { Friend, FriendUser, User } = require("../models/models")
const { Op } = require("sequelize")

class FriendService {
	async createFriend(id, userId) {
		const myUser = await User.findOne({ where: { id: userId } })
		const requestUser = await User.findOne({ where: { id } })
		const logins = `${myUser.login} ${requestUser.login}`
		const friend = await Friend.create({ logins })
		await FriendUser.create({
			userId: id,
			friendId: friend.id,
			approved: false,
		})
		await FriendUser.create({ userId, friendId: friend.id, approved: true })
		return await Friend.findOne({
			where: { id: friend.id },
			include: { model: FriendUser },
		})
	}
	async getFriends(userId, limit) {
		const result = await FriendUser.findAll({
			where: { userId },
			order: [["createdAt", "DESC"]],
			include: {
				model: Friend,
				where: { agree: true },
				include: {
					model: FriendUser,
					where: { userId: { [Op.not]: userId } },
					include: {
						model: User,
						attributes: ["id", "name", "surname", "image"],
					},
				},
			},
		})
		const arr = []
		for (let i = 0; i < result.length; i++) {
			if (i < limit) {
				arr.push(result[i].friend.friend_users[0])
			} else {
				break
			}
		}
		return { rows: arr.slice(0, limit), count: result.length }
	}
	async getSubscriptions(userId, limit) {
		const result = await FriendUser.findAll({
			where: { userId },
			include: {
				model: Friend,
				where: { agree: false },
				include: {
					model: FriendUser,
					where: { approved: true, userId },
					include: {
						model: Friend,
						include: {
							model: FriendUser,
							where: { userId: { [Op.not]: userId } },
							include: {
								model: User,
								attributes: ["id", "name", "surname", "image"],
							},
						},
					},
				},
			},
		})
		const arr = []
		for (let i = 0; i < result.length; i++) {
			if (i < limit) {
				arr.push(result[i].friend.friend_users[0].friend.friend_users[0])
			} else {
				break
			}
		}

		return { rows: arr, count: result.length }
	}
	async getRequestFriends(userId, limit) {
		const result = await FriendUser.findAll({
			where: { userId },
			include: {
				model: Friend,
				where: { agree: false },
				include: {
					model: FriendUser,
					where: { approved: false, userId },
					include: {
						model: Friend,
						include: {
							model: FriendUser,
							where: { userId: { [Op.not]: userId } },
							include: {
								model: User,
								attributes: ["id", "name", "surname", "image"],
							},
						},
					},
				},
			},
		})
		const arr = []
		for (let i = 0; i < result.length; i++) {
			if (i < limit) {
				arr.push(result[i].friend.friend_users[0].friend.friend_users[0])
			} else {
				break
			}
		}

		return { rows: arr, count: result.length }
	}
	async getNotification(userId) {
		const result = await FriendUser.count({
			where: { userId },
			include: {
				model: Friend,
				where: { agree: false },
				include: {
					model: FriendUser,
					where: { approved: false, userId },
					include: {
						model: User,
					},
				},
			},
		})

		return result
	}
	async confirmFriendship(id, userId) {
		const friend = await FriendUser.findOne({ where: { id } })
		await Friend.update({ agree: true }, { where: { id: friend.friendId } })
		await FriendUser.update({ approved: true }, { where: { id } })
		await FriendUser.update({ approved: true }, { where: { id: userId } })
		return await Friend.findOne({
			where: { id: friend.friendId },
			include: { model: FriendUser },
		})
	}
	async checkFriend(userId, id) {
		const myUser = await User.findOne({ where: { id: userId } })
		const requestUser = await User.findOne({ where: { id } })
		const loginsOne = `${myUser.login} ${requestUser.login}`
		const loginsTwo = `${requestUser.login} ${myUser.login}`
		const result = await Friend.findOne({
			where: {
				[Op.or]: [{ logins: loginsOne }, { logins: loginsTwo }],
			},
			include: { model: FriendUser },
		})
		if (result) {
			return result
		} else {
			return null
		}
	}
}

module.exports = new FriendService()
