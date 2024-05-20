import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IComment } from "../models/IComment"
import { IPhoto } from "../models/IPhoto"
import { IResponseComments } from "../models/IResponseComment"
import { IResponsePhotos } from "../models/IResponsePhotos"
import {
	addComment,
	addCommentCount,
	addPhoto,
	changeLike,
	deletePhoto,
	incrementCount,
	removeComment,
	setCommentCount,
	setComments,
	setCount,
	setLoadingComments,
	setLoadingPhotos,
	setPhotos,
} from "../reducers/photoReducer"

export const createPhoto =
	(image: File, description: string) => async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append("image", image)
			formData.append("description", description)
			const response = await $authHost.post<IPhoto>("photo", formData)
			dispatch(addPhoto(response.data))
			dispatch(incrementCount())
		} catch (err) {}
	}

export const getPhotos =
	(id: number, limit: number, page: number, sort: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingPhotos(true))
			const response = await $authHost.get<IResponsePhotos>(
				`photo?id=${id}&limit=${limit}&page=${page}&sort=${sort}`
			)
			dispatch(setPhotos(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoadingPhotos(false))
		}
	}

export const destroyPhoto = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`photo/${id}`)
		dispatch(deletePhoto(id))
	} catch (err) {}
}
export const getComments =
	(id: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingComments(true))
			const response = await $authHost.get<IResponseComments>(
				`photo/comment?photoId=${id}&limit=${limit}`
			)
			dispatch(setComments(response.data.rows))
			dispatch(setCommentCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoadingComments(false))
		}
	}

export const destroyPhotoComment =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`photo/comment/${id}`)
			dispatch(removeComment(id))
		} catch (err) {}
	}

export const createPhotoComment =
	(photoId: number, message: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IComment>(`photo/comment`, {
				photoId,
				message,
			})
			dispatch(addComment(response.data))
			dispatch(addCommentCount())
		} catch (err) {}
	}

export const like = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $authHost.post<IPhoto>(`photo/like`, {
			id,
		})
		dispatch(changeLike(response.data))
	} catch (err) {}
}

export const updateAvatar = async (image: string) => {
	try {
		await $authHost.patch(`photo/avatar?image=${image}`)
	} catch (err) {
	} finally {
		window.location.reload()
	}
}
