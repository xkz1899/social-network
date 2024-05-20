import { IUserList, Message, User } from "../models/IResponseUser"

export interface IChateState {
	messages: Message[]
	contactsList: IUserList[]
	countUsers: number
	selectedUser: User | null
	currentChat: number | null
	isLoadingUsers: boolean
	isLoadingMessage: boolean
}
