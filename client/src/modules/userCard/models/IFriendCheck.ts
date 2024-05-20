export interface IFriendCheck {
	id: number
	agree: boolean
	logins: string
	createdAt: string
	updatedAt: string
	friend_users: FriendUser[]
}

export interface FriendUser {
	id: number
	approved: boolean
	createdAt: string
	updatedAt: string
	userId: number
	friendId: number
}
