const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(`user`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	login: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	image: { type: DataTypes.STRING },
	ban: { type: DataTypes.BOOLEAN, defaultValue: false },
	ban_message: { type: DataTypes.TEXT },
	date_birth: { type: DataTypes.STRING },
	name: { type: DataTypes.TEXT },
	surname: { type: DataTypes.TEXT },
	status: { type: DataTypes.TEXT },
	place_work: { type: DataTypes.TEXT },
	phone_number: { type: DataTypes.TEXT },
	telegram: { type: DataTypes.TEXT },
	university: { type: DataTypes.TEXT },
	faculty: { type: DataTypes.TEXT },
	last_seen: { type: DataTypes.TEXT, defaultValue: new Date().toISOString() },
})

const Token = sequelize.define(`token`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	refresh_token: { type: DataTypes.TEXT, allowNull: false },
})

const Role = sequelize.define(`role`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	role: { type: DataTypes.STRING },
})

const UserRole = sequelize.define(`user_role`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Post = sequelize.define(`post`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	text: { type: DataTypes.TEXT },
	image: { type: DataTypes.TEXT },
	like: { type: DataTypes.INTEGER },
})

const PostComment = sequelize.define(`post_comment`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	message: { type: DataTypes.TEXT },
})

const PostLike = sequelize.define(`post_like`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Photo = sequelize.define(`photo`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	name: { type: DataTypes.TEXT },
	description: { type: DataTypes.TEXT },
	like: { type: DataTypes.INTEGER },
})

const PhotoComment = sequelize.define(`photo_comment`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	message: { type: DataTypes.TEXT },
})

const PhotoLike = sequelize.define(`photo_like`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
})

const Friend = sequelize.define(`friend`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	agree: { type: DataTypes.BOOLEAN, defaultValue: false },
	logins: { type: DataTypes.TEXT },
})

const FriendUser = sequelize.define(`friend_user`, {
	id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
	approved: { type: DataTypes.BOOLEAN },
})

const Chat = sequelize.define("chat", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	logins: { type: DataTypes.TEXT },
})

const UserChat = sequelize.define("userChat", {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	})

const Message = sequelize.define("message", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	message: { type: DataTypes.TEXT },
	unread: { type: DataTypes.BOOLEAN, defaultValue: true },
})

User.hasOne(Token)
Token.belongsTo(User)

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(PostComment)
PostComment.belongsTo(Post)

User.hasOne(PostComment)
PostComment.belongsTo(User)

Post.hasOne(PostLike)
PostLike.belongsTo(Post)

User.hasOne(PostLike)
PostLike.belongsTo(User)


User.hasOne(Photo)
Photo.belongsTo(User)

Photo.hasMany(PhotoComment)
PhotoComment.belongsTo(Photo)

User.hasOne(PhotoComment)
PhotoComment.belongsTo(User)

Photo.hasOne(PhotoLike)
PhotoLike.belongsTo(Photo)

User.hasOne(PhotoLike)
PhotoLike.belongsTo(User)

User.hasOne(FriendUser)
FriendUser.belongsTo(User)

Friend.hasMany(FriendUser)
FriendUser.belongsTo(Friend)

User.hasMany(UserChat)
UserChat.belongsTo(User)

Chat.hasMany(UserChat)
UserChat.belongsTo(Chat)

Chat.hasMany(Message)
Message.belongsTo(Chat)

User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
	User,
	Role,
	Token,
	Post,
	UserRole,
	PostComment,
	PostLike,
	Photo,
	PhotoComment,
	PhotoLike,
	Friend,
	FriendUser,
	Chat,
	Message,
	UserChat
}
