import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPost, PostComment } from "../models/IPost"
import { NewsState } from "./type"

const initialState: NewsState = {
	posts: [],
	count: 0,
}

const newsReducer = createSlice({
	name: "news",
	initialState,
	reducers: {
		setPosts(state, action: PayloadAction<IPost[]>) {
			state.posts = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		updateLike(state, action: PayloadAction<IPost>) {
			state.posts.find(f => f.id === action.payload.id)!.like =
				action.payload.like
		},
		addComment(state, action: PayloadAction<PostComment>) {
			let post = state.posts.find(f => f.id === action.payload.postId)
			post?.post_comments.unshift(action.payload)
		},
	},
})

export default newsReducer.reducer
export const { setPosts, setCount, addComment, updateLike } =
	newsReducer.actions
