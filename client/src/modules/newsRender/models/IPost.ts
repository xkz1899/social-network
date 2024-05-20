export interface IPost {
	id: number
	text: string
	image: string
	like: number
	createdAt: string
	updatedAt: string
	userId: number
	post_comments: PostComment[]
	user: User
}

export interface PostComment {
	id: number
	message: string
	createdAt: string
	updatedAt: string
	postId: number
	userId: number
	user: User
}

export interface User {
	id: number
	name: string
	surname: string
	image: string
}
