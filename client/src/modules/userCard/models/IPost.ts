export interface IPost {
	id: number
	text: string
	image: string
	like: number
	createdAt: string
	updatedAt: string
	userId: number
	user: User
	post_comments: IComment[]
}

interface User {
	id: number
	name: string
	surname: string
	image: string
}

export interface IComment {
	id: number
	message: string
	createdUp: string
	updatedAt: string
	postId: number
	userId: number
	user: User
}
