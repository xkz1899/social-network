import { $authHost } from "../../../http"
import { IUser } from "../../../models/IUser"
import { AppDispatch } from "../../../store"
import { ICommentPhoto } from "../models/ICommentPhoto"
import { IFriendCheck } from "../models/IFriendCheck"
import { IPhoto } from "../models/IPhoto"
import { IComment, IPost } from "../models/IPost"
import { IResponsePost } from "../models/IReposePost"
import { IResponseCommentsPhoto } from "../models/IResponseCommentPhoto"
import { IResponseFriends } from "../models/IResponseFriends"
import { IResponsePhotos } from "../models/IResponsePhotos"
import {
	addComment,
	addCommentCountPhoto,
	addCommentPhoto,
	addPost,
	changeLikePhoto,
	decrementCommentCountPhoto,
	deleteComment,
	deletePost,
	removeCommentPhoto,
	setCommentCountPhoto,
	setCommentsPhoto,
	setCountPhoto,
	setFriend,
	setFriendCount,
	setFriends,
	setLoadingCommentsPhoto,
	setPhotos,
	setPostCount,
	setPosts,
	setUser,
	updateLike,
} from "../reducers/userCardReducer"

export const getUser = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<IUser>(`user/${id}`)
		dispatch(setUser(response.data))
	} catch (err) {}
}

export const createPost =
	(text: string, image: File | null) => async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append("text", text)
			image && formData.append("image", image)
			const response = await $authHost.post<IPost>(`post`, formData)
			dispatch(addPost(response.data))
		} catch (err) {}
	}

export const getPosts =
	(id: string, limit: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponsePost>(
				`post?id=${id}&limit=${limit}`
			)
			dispatch(setPosts(response.data.rows))
			dispatch(setPostCount(response.data.count))
		} catch (err) {}
	}

export const createCommentPost =
	(message: string, postId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IComment>(`post/comment`, {
				message,
				postId,
			})
			dispatch(addComment(response.data))
		} catch (err) {}
	}

export const deleteCommentPost =
	(id: number, postId: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`post/comment/${id}`)
			dispatch(deleteComment({ commentId: id, postId }))
		} catch (err) {}
	}
export const like = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IPost>(`post/like`, { id })
		dispatch(updateLike(response.data))
	} catch (err) {}
}
export const destroyPost = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete<IPost>(`post/${id}`)
		dispatch(deletePost(id))
	} catch (err) {}
}

export const getPhotos =
	(id: number, limit: number, page: number) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponsePhotos>(
				`photo?id=${id}&limit=${limit}&page=${page}`
			)
			dispatch(setPhotos(response.data.rows))
			dispatch(setCountPhoto(response.data.count))
		} catch (err) {}
	}

export const updateAvatar = async (image: File) => {
	try {
		const formData = new FormData()
		formData.append("image", image)
		await $authHost.patch("user/image", formData)
	} catch (err) {
	} finally {
		window.location.reload()
	}
}

export const createPhotoComment =
	(photoId: number, message: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<ICommentPhoto>(`photo/comment`, {
				photoId,
				message,
			})
			dispatch(addCommentPhoto(response.data))
			dispatch(addCommentCountPhoto())
		} catch (err) {}
	}

export const likePhoto = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IPhoto>(`photo/like`, {
			id,
		})
		dispatch(changeLikePhoto(response.data))
	} catch (err) {}
}

export const destroyPhotoComment =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`photo/comment/${id}`)
			dispatch(removeCommentPhoto(id))
			dispatch(decrementCommentCountPhoto())
		} catch (err) {}
	}

export const getCommentsPhoto =
	(id: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingCommentsPhoto(true))
			const response = await $authHost.get<IResponseCommentsPhoto>(
				`photo/comment?photoId=${id}&limit=${limit}`
			)
			dispatch(setCommentsPhoto(response.data.rows))
			dispatch(setCommentCountPhoto(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoadingCommentsPhoto(false))
		}
	}

export const blockUser =
	(id: number, ban?: boolean, message?: string) =>
	async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append("id", id.toString())
			ban && formData.append("ban", ban.toString())
			message && formData.append("message", message)

			await $authHost.patch("user/ban", formData)
			await dispatch(getUser(id))
		} catch (err) {}
	}

export const checkFriend = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.get<IFriendCheck>(`friend/check?id=${id}`)
		dispatch(setFriend(response.data))
	} catch (err) {}
}

export const confirmFriend = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.patch<IFriendCheck>(`friend/confirm/${id}`)
		dispatch(setFriend(response.data))
	} catch (err) {}
}
export const createRequestFriend =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IFriendCheck>(`friend`, { id })
			dispatch(setFriend(response.data))
		} catch (err) {}
	}

export const getFriends =
	(id: number, limit: number = 6) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponseFriends>(
				`friend?id=${id}&limit=${limit}`
			)
			dispatch(setFriends(response.data.rows))
			dispatch(setFriendCount(response.data.count))
		} catch (err) {}
	}

export const checkChat = async (id: number) => {
	try {
		await $authHost.get(`message/check?id=${id}`)
	} catch (err) {
	} finally {
		window.location.reload()
	}
}
