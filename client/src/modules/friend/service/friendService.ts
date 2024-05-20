import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IResponseFriends } from "../models/IResponseFriends"
import {
	removeFriend,
	setCount,
	setFriends,
	setLoading,
} from "../reducers/friendReducer"

export const getFriends =
	(id: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			const response = await $authHost.get<IResponseFriends>(
				`friend?id=${id}&limit=${limit}`
			)
			dispatch(setFriends(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoading(false))
		}
	}
export const getSubscriptions =
	(id: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			const response = await $authHost.get<IResponseFriends>(
				`friend/subscriptions?id=${id}&limit=${limit}`
			)
			dispatch(setFriends(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoading(false))
		}
	}
export const getRequestFriends =
	(id: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true))
			const response = await $authHost.get<IResponseFriends>(
				`friend/request?id=${id}&limit=${limit}`
			)
			dispatch(setFriends(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoading(false))
		}
	}

export const confirmFriendship =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.patch(`friend/confirm/${id}`)
			dispatch(removeFriend(id))
		} catch (err) {}
	}
