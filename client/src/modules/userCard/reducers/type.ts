import { IUser } from "../../../models/IUser"
import { ICommentPhoto } from "../models/ICommentPhoto"
import { IFriend } from "../models/IFriend"
import { IFriendCheck } from "../models/IFriendCheck"
import { IPhoto } from "../models/IPhoto"
import { IPost } from "../models/IPost"

export interface UserCardState {
	user: IUser | null
	postCount: number
	posts: IPost[]
	photos: IPhoto[]
	photoCount: number
	isLoadingCommentsPhoto: boolean
	currentPhoto: IPhoto | null
	commentsPhoto: ICommentPhoto[]
	commentCountPhoto: number
	friend: IFriendCheck | null
	friends: IFriend[] | null
	friendCount: number
}
