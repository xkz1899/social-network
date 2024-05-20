import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUserList, Message, User } from "../models/IResponseUser"
import { IChateState } from "./type"

const initialState: IChateState = {
	messages: [],
	contactsList: [],
	countUsers: 0,
	selectedUser: null,
	currentChat: null,
	isLoadingUsers: false,
	isLoadingMessage: false,
}

const chatReducer = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setContactList(state, action: PayloadAction<IUserList[]>) {
			state.contactsList = action.payload
		},
		setCountUsers(state, action: PayloadAction<number>) {
			state.countUsers = action.payload
		},
		setSelectedUser(state, action: PayloadAction<User | null>) {
			state.selectedUser = action.payload
		},
		setLoadingUsers(state, action: PayloadAction<boolean>) {
			state.isLoadingUsers = action.payload
		},
		setLoadingMessage(state, action: PayloadAction<boolean>) {
			state.isLoadingMessage = action.payload
		},
		setCurrentChat(state, action: PayloadAction<number | null>) {
			state.currentChat = action.payload
		},
		setMessages(state, action: PayloadAction<Message[]>) {
			state.messages = action.payload
		},
		deleteMessage(state, action: PayloadAction<number>) {
			if (state.messages) {
				state.messages = state.messages?.filter(f => f.id !== action.payload)
			}
		},
		pushMessage(state, action: PayloadAction<Message>) {
			state.messages?.push(action.payload)
		},
	},
})

export default chatReducer.reducer
export const {
	setContactList,
	setSelectedUser,
	setLoadingUsers,
	setLoadingMessage,
	setCurrentChat,
	setCountUsers,
	setMessages,
	deleteMessage,
	pushMessage,
} = chatReducer.actions
