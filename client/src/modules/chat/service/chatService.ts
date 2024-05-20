import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { IResponseUser, Message } from "../models/IResponseUser"
import {
	setContactList,
	setCountUsers,
	setLoadingMessage,
	setLoadingUsers,
	setMessages,
} from "../reducers/chatReducer"

export const getAllUsers = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(setLoadingUsers(true))
		const response = await $authHost.get<IResponseUser>("message/chat")
		dispatch(setContactList(response.data.rows))
		dispatch(setCountUsers(response.data.count))
	} catch (err) {
	} finally {
		dispatch(setLoadingUsers(false))
	}
}

export const getMessage = (chatId: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(setLoadingMessage(true))
		await $authHost.patch(`message/read/${chatId}`)
		const response = await $authHost.get<Message[]>("message/chat/" + chatId)
		dispatch(setMessages(response.data))
	} catch (err) {
	} finally {
		dispatch(setLoadingMessage(false))
	}
}

export const sendMessage =
	(chatId: number, message: string) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.post("message", { chatId, message })
			dispatch(getAllUsers)
		} catch (err) {}
	}

export const deleteChat = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete("message/chat/" + id)
	} catch (err) {}
}

