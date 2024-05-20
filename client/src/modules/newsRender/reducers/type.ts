import { IPost } from "../models/IPost"

export interface NewsState {
	posts: IPost[]
	count: number
}
