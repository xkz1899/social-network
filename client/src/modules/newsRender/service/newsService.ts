import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IPost, PostComment } from "../models/IPost"
import { ResponseNews } from "../models/ResponseNews"
import {
	addComment,
	setCount,
	setPosts,
	updateLike,
} from "../reducers/newsReducer"

export const getNews = (limit: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<ResponseNews>(`news?limit=${limit}`)
		dispatch(setPosts(response.data.rows))
		dispatch(setCount(response.data.count))
	} catch (err) {}
}

export const like = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IPost>(`post/like`, { id })
		dispatch(updateLike(response.data))
	} catch (err) {}
}

export const createCommentPost =
	(message: string, postId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<PostComment>(`post/comment`, {
				message,
				postId,
			})
			dispatch(addComment(response.data))
		} catch (err) {}
	}
