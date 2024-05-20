export interface IPhoto {
	id: number
	name: string
	description: string
	userId: number
	like: number
	updatedAt: string
	createdAt: string
	user: User
}

interface User {
	id: number
	name: string
	surname: string
	image: string
}
