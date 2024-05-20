import { IComment } from "../models/IComment"
import { IPhoto } from "../models/IPhoto"

export interface PhotoState {
	photos: IPhoto[]
	isLoadingPhotos: boolean
	isLoadingComments: boolean
	currentPhoto: IPhoto | null
	comments: IComment[]
	commentCount: number
	page: number
	count: number
}
