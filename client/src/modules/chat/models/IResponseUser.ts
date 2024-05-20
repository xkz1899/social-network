export interface IResponseUser {
	rows: IUserList[]
	count: number
}

export interface IUserList {
	id: number
	createdAt: string
	updatedAt: string
	userChats: UserChat[]
	messages: Message[]
}
export interface UserChat {
	userId: number
	chatId: number
	user: User
}

export interface User {
	id: number
	name: string
	surname: string
	image: string
	last_seen: string
}

export interface Message {
	id: number
	message: string
	unread: boolean
	createdAt: string
	updatedAt: string
	chatId: number
	userId: number
}
