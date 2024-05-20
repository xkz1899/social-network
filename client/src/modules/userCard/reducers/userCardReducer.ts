import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

import { IUser } from "../../../models/IUser"
import { IComment, IPost } from "../models/IPost"
import { UserCardState } from "./type"
import { IIdComment } from "../models/IIdComment"
import { IPhoto } from "../models/IPhoto"
import { ICommentPhoto } from "../models/ICommentPhoto"
import { IFriendCheck } from "../models/IFriendCheck"
import { IFriend } from "../models/IFriend"

const initialState: UserCardState = {
	user: null,
	postCount: 0,
	posts: [],
	photos: [],
	photoCount: 0,
	isLoadingCommentsPhoto: false,
	currentPhoto: null,
	commentsPhoto: [],
	commentCountPhoto: 0,
	friend: null,
	friends: null,
	friendCount: 0,
}

const userCardReducer = createSlice({
	name: "user/card",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser | null>) {
			state.user = action.payload
		},
		setPosts(state, action: PayloadAction<IPost[]>) {
			state.posts = action.payload
		},
		addPost(state, active: PayloadAction<IPost>) {
			state.posts.unshift(active.payload)
		},
		setPostCount(state, action: PayloadAction<number>) {
			state.postCount = action.payload
		},
		addComment(state, action: PayloadAction<IComment>) {
			let post = state.posts.find(f => f.id === action.payload.postId)
			post?.post_comments.unshift(action.payload)
		},
		deleteComment(state, action: PayloadAction<IIdComment>) {
			let post = state.posts.find(f => f.id === action.payload.postId)
			if (post?.post_comments) {
				post.post_comments = post?.post_comments.filter(
					f => f.id !== action.payload.commentId
				)
			}
		},
		updateLike(state, action: PayloadAction<IPost>) {
			state.posts.find(f => f.id === action.payload.id)!.like =
				action.payload.like
		},
		deletePost(state, action: PayloadAction<number>) {
			state.posts = state.posts.filter(f => f.id !== action.payload)
		},
		setPhotos(state, action: PayloadAction<IPhoto[]>) {
			state.photos = action.payload
		},
		setCountPhoto(state, action: PayloadAction<number>) {
			state.photoCount = action.payload
		},
		setCommentsPhoto(state, action: PayloadAction<ICommentPhoto[]>) {
			state.commentsPhoto = action.payload
		},
		addCommentPhoto(state, action: PayloadAction<ICommentPhoto>) {
			state.commentsPhoto.unshift(action.payload)
		},
		setCommentCountPhoto(state, action: PayloadAction<number>) {
			state.commentCountPhoto = action.payload
		},
		addCommentCountPhoto(state) {
			state.commentCountPhoto = state.commentCountPhoto + 1
		},
		setCurrentPhoto(state, action: PayloadAction<IPhoto | null>) {
			state.currentPhoto = action.payload
		},
		removeCommentPhoto(state, action: PayloadAction<number>) {
			state.commentsPhoto = state.commentsPhoto.filter(
				f => f.id !== action.payload
			)
		},
		changeLikePhoto(state, action: PayloadAction<IPhoto>) {
			let photo = state.photos.find(f => f.id === action.payload.id)
			if (photo) {
				photo.like = action.payload.like
			}
			if (state.currentPhoto) {
				state.currentPhoto.like = action.payload.like
			}
		},
		setLoadingCommentsPhoto(state, action: PayloadAction<boolean>) {
			state.isLoadingCommentsPhoto = action.payload
		},
		decrementCommentCountPhoto(state) {
			state.commentCountPhoto = state.commentCountPhoto - 1
		},
		setFriend(state, action: PayloadAction<IFriendCheck | null>) {
			state.friend = action.payload
		},
		setFriends(state, action: PayloadAction<IFriend[] | null>) {
			state.friends = action.payload
		},
		setFriendCount(state, action: PayloadAction<number>) {
			state.friendCount = action.payload
		},
	},
})

export default userCardReducer.reducer
export const {
	setUser,
	setPosts,
	setPostCount,
	addComment,
	deleteComment,
	updateLike,
	deletePost,
	addPost,
	setPhotos,
	setCountPhoto,

	addCommentCountPhoto,
	addCommentPhoto,
	changeLikePhoto,
	removeCommentPhoto,
	setCommentCountPhoto,
	setCommentsPhoto,
	setCurrentPhoto,
	setLoadingCommentsPhoto,
	decrementCommentCountPhoto,
	setFriend,
	setFriends,
	setFriendCount,
} = userCardReducer.actions
