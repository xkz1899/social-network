import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

import { PhotoState } from "./type"
import { IPhoto } from "../models/IPhoto"
import { IComment } from "../models/IComment"

const initialState: PhotoState = {
	photos: [],
	isLoadingPhotos: false,
	isLoadingComments: false,
	currentPhoto: null,
	comments: [],
	commentCount: 0,
	page: 1,
	count: 0,
}

const photoReducer = createSlice({
	name: "photo",
	initialState,
	reducers: {
		setPhotos(state, action: PayloadAction<IPhoto[]>) {
			state.photos = action.payload
		},
		addPhoto(state, action: PayloadAction<IPhoto>) {
			state.photos.unshift(action.payload)
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		deletePhoto(state, action: PayloadAction<number>) {
			state.photos = state.photos.filter(f => f.id !== action.payload)
		},
		setComments(state, action: PayloadAction<IComment[]>) {
			state.comments = action.payload
		},
		addComment(state, action: PayloadAction<IComment>) {
			state.comments.unshift(action.payload)
		},
		setCommentCount(state, action: PayloadAction<number>) {
			state.commentCount = action.payload
		},
		addCommentCount(state) {
			state.commentCount = state.commentCount + 1
		},
		setCurrentPhoto(state, action: PayloadAction<IPhoto | null>) {
			state.currentPhoto = action.payload
		},
		removeComment(state, action: PayloadAction<number>) {
			state.comments = state.comments.filter(f => f.id !== action.payload)
		},
		changeLike(state, action: PayloadAction<IPhoto>) {
			let photo = state.photos.find(f => f.id === action.payload.id)
			if (photo) {
				photo.like = action.payload.like
			}
		},
		setLoadingPhotos(state, action: PayloadAction<boolean>) {
			state.isLoadingPhotos = action.payload
		},
		setLoadingComments(state, action: PayloadAction<boolean>) {
			state.isLoadingComments = action.payload
		},
		incrementCount(state) {
			state.count = state.count + 1
		},
	},
})
export default photoReducer.reducer
export const {
	setPhotos,
	addPhoto,
	setPage,
	setCount,
	deletePhoto,
	addComment,
	setCommentCount,
	setComments,
	setCurrentPhoto,
	removeComment,
	changeLike,
	addCommentCount,
	setLoadingComments,
	setLoadingPhotos,
	incrementCount,
} = photoReducer.actions
