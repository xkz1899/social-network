export interface IFriend {
	id: number
	approved: boolean
	createdAt: string
	updatedAt: string
	userId: number
	friendId: number
	logins: string
	user: User
}

export interface User {
	id: number
	name: string
	surname: string
	image: string
}
