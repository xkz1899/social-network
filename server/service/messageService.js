const { Op } = require("sequelize")

const { User, Message, Chat, UserChat } = require("../models/models")

class MessageService {
	async sendMessage(chatId, userId, message) {
		await UserChat.update({ updateAt: new Date() }, { where: { id: chatId } })
		return await Message.create({ message, chatId, userId })
	}
	async createChat(id, userId) {
		const myUser = await User.findOne({ where: { id: userId } })
		const requestUser = await User.findOne({ where: { id } })
		const logins = `${myUser.login} ${requestUser.login}`
		const chat = await Chat.create({ logins })
		await UserChat.create({ userId: id, chatId: chat.id })
		await UserChat.create({ userId, chatId: chat.id })
		return chat
	}
	async getChats(userId) {
		const arr = []
		const tempUserChats = await UserChat.findAll({
			where: { userId },
			order: [["updatedAt", "DESC"]],
		})
		const count = await Chat.count({
			include: [{ model: UserChat, where: { userId } }],
		})

		for (let i = 0; i < tempUserChats.length; i++) {
			const result = await Chat.findAll({
				where: { id: tempUserChats[i].chatId },
				include: [
					{
						model: UserChat,
						attributes: ["userId", "chatId"],
						where: userId,
						include: [{ model: User, where: { id: { [Op.not]: userId } } }],
						order: [["updatedAt", "DESC"]],
						include: [
							{
								model: User,
								attributes: ["id", "name", "surname", "image", "last_seen"],
								where: { id: { [Op.not]: userId } },
							},
						],
					},
					{
						model: Message,
						limit: 1,
						order: [["updatedAt", "DESC"]],
					},
				],
				order: [["updatedAt", "DESC"]],
			})
			await arr.push(...result)
		}
		return { rows: arr, count }
	}
	async getChat(chatId) {
		return await Message.findAll({
			where: { chatId },
			order: [["updatedAt", "ASC"]],
		})
	}
	async searchChat(search) {
		return await Chat.findAll({
			through: {
				attributes: ["updatedAt"],
			},
			include: [
				{
					model: UserChat,
					attributes: ["userId", "chatId"],
					include: [
						{
							model: User,
							where: { login: { [Op.iLike]: "%" + search + "%" } },
						},
					],
				},
				{
					model: Message,
					limit: 1,
				},
			],
		})
	}
	async deleteChat(id) {
		await Message.destroy({ where: { chatId: id } })
		await UserChat.destroy({ where: { chatId: id } })
		await Chat.destroy({ where: { id } })
	}
	async deleteMessage(id) {
		const result = await Message.destroy({ where: { id } })
		if (result === 1) {
			return id
		} else {
			return null
		}
	}
	async checkChat(id, userId) {
		const myUser = await User.findOne({ where: { id: userId } })
		const requestUser = await User.findOne({ where: { id } })
		const loginsOne = `${myUser.login} ${requestUser.login}`
		const loginsTwo = `${requestUser.login} ${myUser.login}`

		const result = await Chat.findOne({
			where: {
				[Op.or]: [{ logins: loginsOne }, { logins: loginsTwo }],
			},
		})
		if (result) {
			return result
		} else {
			this.createChat(id, userId)
			return null
		}
	}
	async readMessage(chatId, userId) {
		await Message.update(
			{ unread: false },
			{ where: { unread: true, chatId, [Op.not]: [{ userId }] } }
		)
	}
}

module.exports = new MessageService()
